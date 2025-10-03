import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";
import type { Room } from "~/entities/room/room";
import { AbsoluteLikedHeart } from "../favs/LikedHearth";

type Props = Pick<Room, "id" | "title" | "description"> & {
	image: string;
	price: string;
};

export function RoomListItem({
	id,
	title,
	description,
	image,
	price,
}: Props) {
	return (
		<li className="group animate-in fade-in">
			<Link
				className="group-hover:bg-foreground/10 bg-foreground/5 transition-opacity rounded-xl gap-4 grid grid-cols-[auto_1fr_auto] overflow-hidden"
				to={`/room/${id}`}
			>
				<div className="relative group">
					<img
						alt={`Room ${id}`}
						className=" w-24 h-full object-cover"
						src={image}
					/>

					<AbsoluteLikedHeart />
				</div>
				<div className="flex flex-col p-2 gap-1 justify-between">
					<h2 className="h-12 line-clamp-2">{title}</h2>
					<p className="text-sm text-neutral-500 line-clamp-2">{description}</p>
					<p className="text-sm text-neutral-500">{price}</p>
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
