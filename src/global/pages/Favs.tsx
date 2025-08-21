import { listMultipleRoomsQuery } from "~/features/room/model/queries/list-multiple-rooms.query";
import { RoomList } from "~/features/room/ui/favs/room-favs-list";
import { mockUsers } from "~/features/user/__mock__/users";

export default function FavsPage() {
	const { savedRoomIds } = mockUsers[0];
	const { rooms } = listMultipleRoomsQuery(savedRoomIds ?? []);
	return <RoomList rooms={rooms} />;
}
