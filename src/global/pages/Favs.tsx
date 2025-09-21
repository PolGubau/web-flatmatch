import { useFavRooms } from "~/features/room/model/use-fav-rooms";
import {
	RoomList,
	RoomListSkeleton,
} from "~/features/room/ui/favs/room-favs-list";

export default function FavsPage() {
	const { rooms, isLoading } = useFavRooms();

	return (
		<section className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto px-4 md:px-6 flex flex-col gap-4">
			<h1 className="text-xl font-semibold">Favorites</h1>
			{isLoading ? <RoomListSkeleton /> : <RoomList rooms={rooms} />}
		</section>
	);
}
