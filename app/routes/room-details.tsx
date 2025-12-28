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
	const { room, isLoading } = useRoom(params.roomId);
	if (isLoading) {
		return <LoadingSection />;
	}
	return (
		<div className="relative overflow-y-auto h-full pb-40 px-4">
			{room ? <RoomDetails room={room} /> : <div>Room not found</div>}
		</div>
	);
}
