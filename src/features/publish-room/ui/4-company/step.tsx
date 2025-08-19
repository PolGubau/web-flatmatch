import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

const Step3Schema = EditableRoomSchema.pick({
	commodities: true,
});
export type Step3SchemaType = z.infer<typeof Step3Schema>;
export function CompanyForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step3SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step3Schema),
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
			<fieldset className="grid gap-6 overflow-y-auto">
				<legend className="text-lg pb-12">Who is living there?</legend>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.commodities && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">{JSON.stringify(errors)}</p>
				)}
				<FormFooterButtons backHref={"/publish/location"} />
			</footer>
		</form>
	);
}
