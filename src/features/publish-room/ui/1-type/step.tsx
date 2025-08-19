import { zodResolver } from "@hookform/resolvers/zod";
import { HutIcon, MeetingRoomIcon, SlideshareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import { RadioBox } from "../shared/radiobox";

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
const Step1Schema = EditableRoomSchema.pick({
	rentType: true,
});
export type Step1SchemaType = z.infer<typeof Step1Schema>;
export function Step1() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step1SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step1Schema),
	});

	return (
		<form
			className="grid grid-rows-[1fr_auto] gap-2 h-full"
			onSubmit={handleSubmit(
				(values) => {
					setData(values);
					navigate("/publish/location", { replace: true });
				},
				(errors) => {
					console.error(errors);
				},
			)}
		>
			<fieldset>
				<legend className="text-lg pb-12">What are you renting?</legend>
				<ul className="grid grid-rows-3 gap-2 min-h-40 w-full max-w-4xl mx-auto min-w-[300px]">
					{RENT_TYPES.map(({ id, label, value, icon, description }) => {
						const field = register("rentType", { required: "Rent type is required" });
						return (
							<RadioBox<"rentType">
								description={description}
								field={field}
								icon={icon}
								key={id}
								label={label}
								value={value}
							/>
						);
					})}
				</ul>
			</fieldset>
			<footer className="flex flex-col gap-1">
				{errors.rentType && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">{errors.rentType.message}</p>
				)}
				<FormFooterButtons />
			</footer>
		</form>
	);
}
