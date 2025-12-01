import { zodResolver } from "@hookform/resolvers/zod";
import {
	HutIcon,
	MeetingRoomIcon,
	SlideshareIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import type { TranslationKey } from "~/shared/i18n/i18n";
import type { RentType } from "~/shared/types/common";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import { RadioBox } from "../shared/radiobox";

type RentTypeSelector = {
	label: TranslationKey;
	value: RentType;
	icon: IconSvgElement;
	description: string;
};

export const RENT_TYPES: RentTypeSelector[] = [
	{
		description: "A private room for one or more guests",
		icon: MeetingRoomIcon,
		label: "private_room",
		value: "private-room",
	},
	{
		description: "A shared room in a flat with more people",
		icon: SlideshareIcon,
		label: "shared_room",
		value: "shared-room",
	},
	{
		description: "An entire apartment for one or more guests",
		icon: HutIcon,
		label: "entire_flat",
		value: "entire-flat",
	},
];
const Step1Schema = EditableRoomSchema.pick({
	rentType: true,
});
export type Step1SchemaType = z.infer<typeof Step1Schema>;
export function Step1() {
	const navigate = useNavigate();
	const { t } = useTranslation();
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
			<fieldset className="flex flex-col gap-6 p-1 overflow-y-auto">
				<legend className="text-lg pb-12">{t("what_are_you_renting")}</legend>
				<ul className="grid grid-rows-3 gap-2 min-h-40 w-full max-w-4xl mx-auto min-w-[300px]">
					{RENT_TYPES.map(({ label, value, icon, description }) => {
						const field = register("rentType", {
							required: "Rent type is required",
						});
						return (
							<RadioBox<"rentType">
								description={description}
								field={field}
								icon={icon}
								key={value}
								label={label}
								value={value}
							/>
						);
					})}
				</ul>
			</fieldset>
			<footer className="flex flex-col gap-1">
				{errors.rentType && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">
						{errors.rentType.message}
					</p>
				)}
				<FormFooterButtons />
			</footer>
		</form>
	);
}
