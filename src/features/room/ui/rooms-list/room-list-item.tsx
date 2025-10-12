import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";
import type { Room } from "~/entities/room/room";
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
		<li className="group animate-in fade-in">
			<Link
				className="group-hover:bg-foreground/10 min-h-36 bg-foreground/5 transition-opacity rounded-xl gap-4 grid grid-cols-[auto_1fr_auto] overflow-hidden"
				to={`/room/${id}`}
			>
				<div className="relative group">
					<img
						alt={`Room ${id}`}
						className=" w-24 h-full object-cover"
						src={image}
					/>

					{isFavorite && <AbsoluteLikedHeart />}
				</div>
				<div className="flex-col p-2 gap-1 grid grid-rows-[auto_auto_1fr]">
					<h2 className="max-md:line-clamp-2 line-clamp-1 ">{title}</h2>
					<p className="text-sm text-foreground/80">{price}</p>

					<p className="text-sm text-foreground/70 max-md:line-clamp-3 line-clamp-2 whitespace-pre-wrap break-words">
						{description}
					</p>
				</div>

				<footer className="flex ">
					<HugeiconsIcon
						className="mt-4 mr-4 group-hover:mt-3 group-hover:mr-3 transition-all ease-in-out"
						icon={ArrowUpRight03Icon}
						size={20}
					/>
				</footer>
			</Link>
		</li>
	);
}
