import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import type { EditableRoom } from "~/entities/room/editable-room";
import type { Room } from "~/entities/room/room";
import { RoomTinderCardUI } from "~/features/room/ui/room-tinder-card-ui";
import { Button } from "~/shared/components/ui/button";
import { usePublishRoom } from "../../model/publish-room";
import { useFormState } from "../../model/useFormState";

const getUrlFromFile = (file: File) => {
	try {
		return URL.createObjectURL(file);
	} catch (error) {
		console.error("Error creating URL from file:", error);
		return "";
	}
};

const getCover = (galley: (string | File)[], coverIndex: number) => {
	const cover = galley[coverIndex];
	if (typeof cover === "string") return cover;
	return getUrlFromFile(cover);
};
const getGallery = (galley: (string | File)[]) => {
	return galley.map((img) => {
		if (typeof img === "string") return img;
		return getUrlFromFile(img);
	});
};
const editableToImages = (images: EditableRoom["images"]): Room["images"] => {
	return {
		cover: getCover(images.gallery, images.coverIndex),
		gallery: getGallery(images.gallery),
	};
};
export const RoomPreview = () => {
	const { data } = useFormState();
	const { create, isPending } = usePublishRoom();

	return (
		<div className="grid md:grid-cols-2 gap-10 items-start">
			<div className="pt-10 flex flex-col gap-6 justify-between h-full">
				<h1 className="text-3xl font-bold">{t("your_room_ready")}</h1>
				<Button
					className="w-fit text-xl !pl-8 !pr-6 py-6"
					disabled={isPending}
					onClick={() => create(data)}
				>
					{t("publish_room")}
					<HugeiconsIcon icon={ArrowRight01Icon} />
				</Button>
			</div>
			<div className="h-[60vh] bg-neutral-500 overflow-hidden w-[80vw] max-w-[500px] rounded-3xl hover:cursor-grab active:cursor-grabbing origin-bottom shadow shadow-neutral-500/10 relative">
				<RoomTinderCardUI
					description={data.description}
					images={editableToImages(data.images)}
					price={data.price}
					title={data.title}
					verification={{
						notes: null,
						verificationType: null,
						verifiedAt: null,
						verifiedBy: null,
					}}
				/>
			</div>
		</div>
	);
};
