import { useFavRooms } from "~/features/room/model/use-fav-rooms";
import { RoomList } from "~/features/room/ui/favs/room-favs-list";

export default function FavsPage() {
	const { rooms } = useFavRooms();
	return <RoomList rooms={rooms} />;
}
