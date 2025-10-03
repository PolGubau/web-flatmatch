import { useFavRooms } from "~/features/room/model/use-fav-rooms";
import { RoomListWrapper } from "~/features/room/ui/rooms-list/room-list-wrapper";

export default function FavsPage() {
	const { rooms, isLoading } = useFavRooms();

	return (
		<div className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto px-4 md:px-6 ">
			<RoomListWrapper isLoading={isLoading} rooms={rooms} title="favorites" />
		</div>
	);
}
