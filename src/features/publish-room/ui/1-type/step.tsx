// ui/Step1.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { HutIcon, MeetingRoomIcon, SlideshareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

const RENT_TYPES = [
	{
		description: "A private room for one or more guests",
		icon: MeetingRoomIcon,
		id: "room",
		label: "Room",
		value: "room",
	},
	{
		description: "A shared room in a flat with more people",
		icon: SlideshareIcon,
		id: "shared",
		label: "Shared",
		value: "shared",
	},
	{
		description: "An entire apartment for one or more guests",
		icon: HutIcon,
		id: "apartment",
		label: "Entire space",
		value: "entire",
	},
];

/**
 * First step of room publishing flow.
 * Lets the user select rent type.
 */
export function Step1() {
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
				setData(values);
				navigate("/publish/location", { replace: true });
			})}
		>
			<fieldset>
				<legend className="text-lg pb-12">What are you renting?</legend>

				<ul className="grid grid-rows-3 gap-6 min-h-40 w-full max-w-4xl mx-auto min-w-[300px]">
					{RENT_TYPES.map(({ id, label, value, icon, description }) => (
						<li className="flex group" key={id}>
							<label className="has-checked:bg-primary/20 bg-secondary/10 p-6 w-full h-full grid items-center grid-cols-[1fr_auto] rounded-xl gap-6">
								<div className="flex items-end gap-2">
									<HugeiconsIcon icon={icon} size={40} />
									<span className="text-xl">{label}</span>
								</div>
								<input
									className="outline-0 checked:accent-primary "
									type="radio"
									{...register("rentType", { required: "Rent type is required" })}
									value={value}
								/>
								<p className="text-foreground/80 text-sm text-pretty">{description}</p>
							</label>
						</li>
					))}
				</ul>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.rentType && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">{errors.rentType.message}</p>
				)}

				<FormFooterButtons canGoBack={false} />
			</footer>
		</form>
	);
}
