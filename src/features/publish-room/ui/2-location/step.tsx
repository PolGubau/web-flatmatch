// ui/Step1.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { MapWithMarker } from "~/shared/components/map";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import bcn from "./assets/bcn.svg";
import rome from "./assets/rome.svg";
import { StreetAutocomplete } from "./street-autocomplete";

const AVAILABLE_AREAS = [
	{
		icon: rome,
		label: "Rome",
		value: "rome",
	},
	{
		icon: bcn,
		label: "Barcelona",
		value: "bcn",
	},
].sort((a, b) => a.label.localeCompare(b.label));

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

	const field = register("location.address", { required: "Address is required" });
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
				<legend className="text-lg pb-10">Where is your room located?</legend>
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
					<h3 className="px-2text-sm">Supported areas</h3>
					<ul className="flex gap-2 w-full">
						{AVAILABLE_AREAS.map(({ label, value, icon }) => {
							return (
								<li className="bg-secondary/10 py-2 px-4 items-center rounded-xl gap-6" key={value}>
									<div className="flex items-end gap-2">
										<img alt={label} className="w-6 h-6" src={icon} />
										<span>{label}</span>
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
