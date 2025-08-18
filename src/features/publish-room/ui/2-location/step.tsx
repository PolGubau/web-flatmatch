// ui/Step1.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { type AvailableCity, EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import bcn from "./assets/bcn.svg";
import rome from "./assets/rome.svg";

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
const stateMapper: Record<string, AvailableCity[]> = {
	italy: ["rome"],
	spain: ["bcn"],
};

/**
 * First step of room publishing flow.
 * Lets the user select rent type.
 */
export function LocationForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { ...data },
		resolver: zodResolver(EditableRoomSchema),
	});

	return (
		<form
			className="grid grid-rows-[1fr_auto] gap-2 h-full"
			onSubmit={handleSubmit((values) => {
				// populate the state from the chosen city
				const state = Object.keys(stateMapper).find((key) =>
					stateMapper[key].includes(values.location.city),
				);
				setData({
					...values,
					location: {
						...values.location,
						country: state ?? "spain",
					},
				});
				// setData(values);
				// navigate("/publish/location", { replace: true });
			})}
		>
			<fieldset className="flex flex-col gap-6">
				<pre>{JSON.stringify(data.location, null, 2)}</pre>
				<legend className="text-lg pb-12">Where is your room located?</legend>
				<ul className="grid gap-2 w-full max-w-4xl mx-auto">
					{AVAILABLE_AREAS.map(({ label, value, icon }) => (
						<li className="flex group" key={value}>
							<label className="has-checked:bg-primary/20 bg-secondary/10 p-6 w-full h-full grid items-center grid-cols-[1fr_auto] rounded-xl gap-6">
								<div className="flex items-end gap-2">
									<img alt={label} className="w-10 h-10" src={icon} />
									<span className="text-xl">{label}</span>
								</div>
								<input
									className="outline-0 checked:accent-primary "
									type="radio"
									{...register("location.city", { required: "City is required" })}
									value={value}
								/>
							</label>
						</li>
					))}
				</ul>

				<label className="flex flex-col gap-1">
					<span className="text-sm">Location</span>
					<input
						{...register("location.address")}
						className="border p-2 rounded-xl border-foreground/30 outline-0 focus-visible:border-primary transition-colors"
					/>
				</label>
				<label className="flex flex-col gap-1">
					<span className="text-sm">Postal Code</span>
					<input
						{...register("location.postalCode", {
							max: 99999,
							maxLength: 5,
							min: 10000,
							minLength: 5,
							pattern: {
								message: "Invalid postal code format",
								value: /^\d{5}$/,
							},
							required: "Postal code is required",
						})}
						className="border p-2 rounded-xl border-foreground/30 outline-0 focus-visible:border-primary transition-colors"
						type="number"
					/>
				</label>
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

				<FormFooterButtons />
			</footer>
		</form>
	);
}
