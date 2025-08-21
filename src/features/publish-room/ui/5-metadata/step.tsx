import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { Input } from "~/shared/components/ui/input";
import { Textarea } from "~/shared/components/ui/textarea";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import { GalleryForm } from "./gallery-form";

export const Step5Schema = EditableRoomSchema.pick({
	description: true,
	images: true,
	title: true,
});
export type Step5SchemaType = z.infer<typeof Step5Schema>;
export function MetadataForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Step5SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step5Schema),
	});

	const images = watch("images.gallery");
	const mainImage = watch("images.main");

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={handleSubmit(
				(values) => {
					setData(values);
					navigate("/publish/preferences", { replace: true });
				},
				(errors) => {
					console.error(errors);
				},
			)}
		>
			<fieldset className="flex flex-col gap-6 overflow-y-auto">
				<legend className="text-lg pb-10">Add Metadata</legend>

				<Input
					id="bedrooms-male"
					label="Title"
					minLength={5}
					placeholder="Big and spacious room near train station..."
					required
					{...register("title", {
						required: true,
					})}
				/>

				<Textarea
					label="Description"
					minLength={10}
					placeholder="How many female tenants?"
					required
					{...register("description", {
						required: true,
					})}
				/>

				<GalleryForm
					images={images}
					mainIndex={mainImage}
					onChangeImages={setValue}
					onChangeMain={(main) => {
						setValue("images.main", main);
						console.log(main);
					}}
				/>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{(errors.description || errors.title || errors.images) && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">
						{JSON.stringify(errors.description)}
						{JSON.stringify(errors.title)}
						{JSON.stringify(errors.images)}
					</p>
				)}
				<FormFooterButtons backHref={"/publish/company"} />
			</footer>
		</form>
	);
}
