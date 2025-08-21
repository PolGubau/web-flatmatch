import { ArrowUpRight03Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";
import type { Room } from "~/entities/room/room";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";

type Props = {
	room: Room;
};

export function RoomFavsListItem({ room }: Props) {
	return (
		<li className="group " key={room.id}>
			<Link
				className="group-hover:bg-foreground/10 bg-foreground/5 transition-opacity rounded-xl gap-4 grid grid-cols-[auto_1fr_auto] overflow-hidden"
				to={`/room/${room.id}`}
			>
				<div className="relative group">
					<img
						alt={`Room ${room.id}`}
						className=" w-24 h-full object-cover"
						src={room.images.gallery[room.images.main]}
					/>

					<div className="absolute top-1 right-1 ring-neutral-200 group-hover:ring-neutral-300 text-foreground/50">
						<HugeiconsIcon className="fill-red-400" icon={FavouriteIcon} size={22} />
					</div>
				</div>
				<div className="flex flex-col p-2 gap-1 justify-between">
					<h2>{room.title}</h2>
					<p className="text-sm text-neutral-500 line-clamp-2">{room.description}</p>
					<p className="text-sm text-neutral-500">
						{currencyFormat(room.price.amount, room.price.currency)}
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
