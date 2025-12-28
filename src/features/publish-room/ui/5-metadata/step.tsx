import { zodResolver } from "@hookform/resolvers/zod";
import { EuroIcon } from "@hugeicons/core-free-icons";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { Input } from "~/shared/components/ui/input/input";
import { Textarea } from "~/shared/components/ui/textarea";
import { useFormNavigation } from "../../model/use-form-navigation";
import { useFormState } from "../../model/useFormState";
import { ErrorMessage } from "../shared/error-message";
import { FormFooterButtons } from "../shared/form-footer-buttons";
import { GalleryForm } from "./gallery-form";

export const Step5Schema = EditableRoomSchema.pick({
	description: true,
	images: true,
	price: true,
	title: true,
});
export type Step5SchemaType = z.infer<typeof Step5Schema>;
export function MetadataForm() {
	const { data } = useFormState();
	const { wrapSubmit } = useFormNavigation<Step5SchemaType>({
		nextStep: "/publish/preferences",
	});
	const { t } = useTranslation();

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
	const coverIndex = watch("images.coverIndex");

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={wrapSubmit(handleSubmit)}
		>
			<fieldset className="flex flex-col gap-6 p-1 overflow-y-auto">
				<legend className="text-lg pb-10">{t("add_metadata")}</legend>

				<Input
					id="bedrooms-male"
					label="title"
					minLength={5}
					placeholder={t("metadata_title_placeholder")}
					required
					{...register("title", {
						required: true,
					})}
				/>

				<Textarea
					label="description"
					minLength={10}
					placeholder={t("metadata_description_placeholder")}
					required
					{...register("description", {
						required: true,
					})}
				/>

				<section>
					<h2>{t("price")}</h2>
					<div>
						<Input
							icon={EuroIcon}
							label="price_monthly"
							minLength={1}
							placeholder={t("add_price")}
							required
							type="number"
							{...register("price.amount", {
								min: 1,
								required: true,
								valueAsNumber: true,
							})}
						/>
						<p></p>
					</div>
				</section>

				<GalleryForm
					images={images}
					mainIndex={coverIndex}
					onChangeImages={setValue}
					onChangeMain={(main) => {
						setValue("images.coverIndex", main, { shouldValidate: true });
						console.log(main);
					}}
				/>
			</fieldset>

			<footer className="flex flex-col gap-1">
				<ErrorMessage
					// biome-ignore lint/suspicious/noExplicitAny: react-hook-form complex type
					error={(errors.description || errors.title || errors.images) as any}
				/>
				<FormFooterButtons backHref={"/publish/company"} />
			</footer>
		</form>
	);
}
