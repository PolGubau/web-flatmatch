import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { MapWithMarker } from "~/shared/components/map";
import { StreetAutocomplete } from "~/shared/components/ui/address-autocomplete/address-autocomplete";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import { MapPlaceholder } from "./ui/map-placeholder";

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
	const field = register("location.address", {
		required: t("address_is_required"),
	});
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
			<fieldset className="flex flex-col gap-6 p-1 overflow-y-auto">
				<legend className="text-lg pb-10">
					{t("where_is_your_room_located")}
				</legend>

				<section className="md:grid-cols-2 grid gap-6 h-full">
					<article className="flex flex-col gap-8">
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
							value={location.address}
						/>
						{location.address && (
							<ul className="flex flex-col gap-2 text-sm text-foreground/80">
								<li className="grid grid-cols-2 gap-2">
									<span className="capitalize text-foreground/60">
										{t("city")}
									</span>
									<span>{location.city}</span>
								</li>
								<li className="grid grid-cols-2 gap-2">
									<span className="capitalize text-foreground/60">
										{t("country")}
									</span>
									<span>{location.country}</span>
								</li>
								<li className="grid grid-cols-2 gap-2">
									<span className="capitalize text-foreground/60">
										{t("postal_code")}
									</span>
									<span>{location.postalCode}</span>
								</li>
								<li className="grid grid-cols-2 gap-2">
									<span className="capitalize text-foreground/60">
										{t("latitude")}
									</span>
									<span>{location.lat}</span>
								</li>
								<li className="grid grid-cols-2 gap-2">
									<span className="capitalize text-foreground/60">
										{t("longitude")}
									</span>
									<span>{location.lng}</span>
								</li>
							</ul>
						)}
					</article>
					{lat && lng ? (
						<MapWithMarker lat={lat} lon={lng} />
					) : (
						<MapPlaceholder />
					)}
				</section>
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
