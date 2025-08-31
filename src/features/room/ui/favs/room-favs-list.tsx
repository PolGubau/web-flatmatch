import type { Room } from "~/entities/room/room";
import { RoomFavsListItemSkeleton } from "./favs-item-skeleton";
import { RoomFavsListItem } from "./room-favs-item";

type Props = {
	rooms: Room[];
};
export function RoomList({ rooms }: Props) {
	return (
		<ul className="flex flex-col gap-3">
			{rooms?.map((room) => (
				<RoomFavsListItem
					description={room.description}
					id={room.id}
					image={room.images.cover}
					key={room.id}
					price={room.price.localePrice}
					title={room.title}
				/>
			))}

			{rooms.length === 0 && <li>No favorite rooms found.</li>}
		</ul>
	);
}

export function RoomListSkeleton() {
	return (
		<ul className="flex flex-col gap-3">
			{Array.from({ length: 3 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: No reorder
				<RoomFavsListItemSkeleton key={index} />
			))}
		</ul>
	);
}
