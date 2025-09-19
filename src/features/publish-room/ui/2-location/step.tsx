// ui/Step1.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import type { IconSvgElement } from "@hugeicons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { MapWithMarker } from "~/shared/components/map";
import { AutoComplete } from "~/shared/components/ui/autocomplete";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import bcn from "./assets/bcn.svg";
import rome from "./assets/rome.svg";
import { StreetAutocomplete } from "./street-autocomplete";

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
	const location = watch("location");
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

				<div className="md:grid-cols-2 grid gap-4 ">
					<div>
						<StreetAutocomplete
							field={field}
							onSelect={(v) => {
								setValue("location.postalCode", v.postcode);
								setValue("location.address", v.name);
								setValue("location.lat", v.lat);
								setValue("location.lng", v.lon);
								setValue("location.city", v.city);
								setValue("location.country", v.country);
							}}
						/>

						{JSON.stringify(location, null, 2)}
					</div>
					{lat && lng ? <MapWithMarker lat={lat} lon={lng} /> : null}
				</div>
			</fieldset>

			<footer className="flex flex-col gap-1">
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
