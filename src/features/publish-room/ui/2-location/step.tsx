// ui/Step1.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import type { IconSvgElement } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { MapWithMarker } from "~/shared/components/map";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import bcn from "./assets/bcn.svg";
import rome from "./assets/rome.svg";
import { StreetAutocomplete } from "./street-autocomplete";

type AvailableArea = {
	icon: string;
	label: TranslationKey;
	value: string;
};
const AVAILABLE_AREAS: AvailableArea[] = [
	{
		icon: rome,
		label: "rome",
		value: "rome",
	},
	{
		icon: bcn,
		label: "barcelona",
		value: "bcn",
	},
];
const sorted_areas = AVAILABLE_AREAS.sort((a, b) => a.label.localeCompare(b.label));

const Step2Schema = EditableRoomSchema.pick({
	location: true,
});
export type Step2SchemaType = z.infer<typeof Step2Schema>;

export function LocationForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: { ...data },
		resolver: zodResolver(Step2Schema),
	});
	const { t } = useTranslation();
	const field = register("location.address", { required: t("address_is_required") });
	const lat = watch("location.lat");
	const lng = watch("location.lng");
	return (
		<form
			className="grid grid-rows-[1fr_auto] gap-2 h-full"
			onSubmit={handleSubmit((values) => {
				setData(values);
				navigate("/publish/commodities", { replace: true });
			})}
		>
			<fieldset className="flex flex-col gap-6">
				<legend className="text-lg pb-10">{t("where_is_your_room_located")}</legend>
				<StreetAutocomplete
					field={field}
					onChange={(v) => {
						setValue("location.postalCode", v.postcode);
						setValue("location.address", v.name);
						setValue("location.lat", v.lat);
						setValue("location.lng", v.lon);
						setValue("location.city", v.city);
						setValue("location.country", v.country);
					}}
				/>
				{lat && lng ? <MapWithMarker lat={lat} lon={lng} /> : null}
			</fieldset>

			<footer className="flex flex-col gap-1">
				<div className="flex flex-col gap-2">
					<h3 className="px-2text-sm">{t("supported_areas")}</h3>
					<ul className="flex gap-2 w-full">
						{sorted_areas.map(({ label, value, icon }) => {
							return (
								<li className="bg-secondary/10 py-2 px-4 items-center rounded-xl gap-6" key={value}>
									<div className="flex items-end gap-2">
										<img alt={label} className="w-6 h-6" src={icon} />
										<span>{t(label)}</span>
									</div>
								</li>
							);
						})}
					</ul>
				</div>

				{errors.location?.city && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">
						{errors.location.city.message}
					</p>
				)}
				{errors.location?.postalCode && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">
						{errors.location.postalCode.message}
					</p>
				)}

				<FormFooterButtons backHref={"/publish"} />
			</footer>
		</form>
	);
}
