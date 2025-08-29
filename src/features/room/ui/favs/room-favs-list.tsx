import type { Room } from "~/entities/room/room";
import { RoomFavsListItem } from "./room-favs-list-item";

type Props = {
	rooms: Room[];
};
export function RoomList({ rooms }: Props) {
	return (
		<ul className="flex flex-col gap-3">
			{rooms?.map((room) => (
				<RoomFavsListItem key={room.id} room={room} />
			))}

			{rooms.length === 0 && <li>No favorite rooms found.</li>}
		</ul>
	);
}
