import { useRoom } from "~/features/room/model/use-room";
import RoomDetails from "~/features/room/ui/details/room-details";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";
import type { Route } from "./+types/room-details";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: `Room Details - ${data}` },
		{ content: "Welcome to Flatmatch!", name: "description" },
	];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	return params.roomId;
}

export default function RoomDetailsPage({ params }: Route.ComponentProps) {
	const { room } = useRoom(params.roomId);

	return <div className="relative">{!room ? <LoadingSection /> : <RoomDetails room={room} />}</div>;
}
