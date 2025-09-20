import { RoomPreview } from "~/features/publish-room/ui/9-preview/step";

export function meta() {
	return [
		{ title: "Preview your new room | Flatmatch" },
		{ content: "Preview the information of your new room", name: "description" },
	];
}
export default function RoomPreviewRoute() {
	return <RoomPreview />;
}
