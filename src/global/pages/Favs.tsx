import { listMultipleRoomsQuery } from "~/features/room/model/queries/list-multiple-rooms.query";
import { RoomList } from "~/features/room/ui/favs/room-favs-list";

export default function FavsPage() {
	const savedRoomIds: string[] = [];
	const { rooms } = listMultipleRoomsQuery(savedRoomIds);
	return <RoomList rooms={rooms} />;
}
