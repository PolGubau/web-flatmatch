import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";
import type { Room } from "~/entities/room/room";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "~/shared/components/ui/item";
import { AbsoluteLikedHeart } from "../favs/LikedHearth";

type Props = Pick<Room, "id" | "title" | "description"> & {
	image: string;
	price: string;
	isFavorite?: boolean;
};

export function RoomListItem({
	id,
	title,
	description,
	image,
	price,
	isFavorite,
}: Props) {
	return (
		<div className="flex w-full flex-col gap-4">
			<Item asChild className="group" variant={"muted"}>
				<Link to={`/room/${id}`}>
					<ItemMedia className="relative size-20" variant="image">
						<img
							alt={title}
							className="object-cover"
							height={40}
							src={image}
							width={40}
						/>
						{isFavorite && <AbsoluteLikedHeart />}
					</ItemMedia>
					<ItemContent>
						<ItemTitle>
							{title} - {price}
						</ItemTitle>
						<ItemDescription>{description}</ItemDescription>
					</ItemContent>
					<ItemActions>
						<ChevronRightIcon className="size-4 group-hover:translate-x-1 transition-all" />
					</ItemActions>
				</Link>
			</Item>
		</div>
	);
}
