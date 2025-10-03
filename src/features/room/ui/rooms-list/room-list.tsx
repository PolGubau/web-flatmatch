import i18n from "i18next";
import type { Room } from "~/entities/room/room";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";
import { RoomFavsListItemSkeleton } from "../favs/favs-item-skeleton";
import { RoomListItem } from "./room-list-item";

type Props = {
	rooms: Room[];
};
export function RoomList({ rooms }: Props) {
	return (
		<ul className="flex flex-col gap-3">
			{rooms?.map((room) => {
				const formattedPrice = currencyFormat(
					room.price.amount,
					room.price.currency,
					i18n.language,
				);
				return (
					<RoomListItem
						description={room.description}
						id={room.id}
						image={room.images.cover}
						key={room.id}
						price={formattedPrice}
						title={room.title}
					/>
				);
			})}
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
