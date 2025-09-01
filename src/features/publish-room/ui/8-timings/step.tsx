import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

export const Step6Schema = EditableRoomSchema.pick({
	preferences: true,
});
export type Step6SchemaType = z.infer<typeof Step6Schema>;
export function PreferencesForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step6SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step6Schema),
	});

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={handleSubmit(
				(values) => {
					setData(values);
					// navigate("/publish/location", { replace: true });
				},
				(errors) => {
					console.error(errors);
				},
			)}
		>
			<fieldset className="flex flex-col gap-6 overflow-y-auto">
				<legend className="text-lg pb-10">What are you searching?</legend>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.preferences && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">{JSON.stringify(errors)}</p>
				)}
				<FormFooterButtons backHref={"/publish/company"} />
			</footer>
		</form>
	);
}
