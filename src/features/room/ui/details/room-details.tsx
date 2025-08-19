import type { Room } from "~/entities/room/room";
import "./room-details.css";
import { RoomDetailsImage } from "./image";

type Props = {
	room: Room;
};

export default function RoomDetails({ room }: Props) {
	const image = room?.images.main;
	const restOfImages = room?.images.gallery;
	return (
		<section className="grid md:grid-cols-2 gap-4">
			<ul className="room-details-gallery">
				<li>
					<RoomDetailsImage alt={room.title} src={image} />
				</li>
				{restOfImages.map((src) => (
					<li key={src}>
						<RoomDetailsImage alt={room.title} src={src} />
					</li>
				))}
			</ul>

			<div className="flex flex-col gap-2 p-4">
				<h1 className="text-pretty text-xl max-md:max-w-xs">{room?.title}</h1>
				<p>{room?.location.address}</p>
				<p className="text-foreground/80">{room?.description}</p>
				<p>
					{" "}
					{room?.price.amount} {room?.price.currency}
				</p>

				<ul>
					<li>{room?.commodities.whole?.area}</li>
				</ul>
			</div>
		</section>
	);
}
