import { Camera01Icon, DeleteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { UseFormSetValue } from "react-hook-form";
import type { EditableRoom } from "~/entities/room/editable-room";
import { cn } from "~/shared/utils/utils";
import type { Step5SchemaType } from "./step";

type Image = EditableRoom["images"]["gallery"][number];
type Props = {
	onChangeImages: UseFormSetValue<Step5SchemaType>;
	onChangeMain: (index: number) => void;
	images: Image[];
	mainIndex: number;
};
export function GalleryForm({ onChangeImages, onChangeMain, images, mainIndex }: Props) {
	return (
		<div className="space-y-4">
			<label className="flex flex-col gap-1">
				Upload images
				<div className="flex gap-2 items-center bg-foreground/10 rounded-full py-2 px-4 w-fit">
					<HugeiconsIcon icon={Camera01Icon} size={20} />
					Upload images to the gallery
				</div>
				<input
					accept="image/*"
					hidden
					multiple
					onChange={(e) => {
						const files = e.target.files;
						if (!files) return;
						onChangeImages("images.gallery", Array.from(files), { shouldValidate: true });
					}}
					required
					type="file"
				/>
			</label>

			<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
				{images?.map((image, i) => {
					const key = `uploaded-${i}`;
					const handleDelete = () => {
						const filteredImages = images.filter((_, index) => index !== i);

						onChangeImages("images.gallery", filteredImages, { shouldValidate: true });
					};

					const getSrc = (image: Image) => {
						return typeof image === "string" ? image : URL.createObjectURL(image);
					};

					const imageSrc = getSrc(image);

					const isMain = mainIndex === i;
					return (
						<li className="relative group" key={key}>
							<button
								className={cn("w-full rounded hover:brightness-75 cursor-pointer overflow-hidden", {
									"outline-4 outline-primary": isMain,
								})}
								onClick={() => {
									onChangeMain(i);
								}}
								type="button"
							>
								<img alt={`Uploaded ${i}`} key={key} src={imageSrc} />
							</button>

							<button
								className="absolute text-red top-1 right-1 rounded-full bg-error-300/80 p-1 cursor-pointer hover:bg-error-300 transition-all invisible group-hover:visible  "
								onClick={handleDelete}
								type="button"
							>
								<HugeiconsIcon icon={DeleteIcon} size={18} />
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
