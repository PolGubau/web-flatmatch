import { ArrowAllDirectionIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Room } from "~/entities/room/room";
import { MapWithMarker } from "~/shared/components/map";
import { RoomDetailsImage } from "./image";
import "./room-details.css";
import { useTranslation } from "react-i18next";

type Props = {
	room: Room;
};

export default function RoomDetails({ room }: Props) {
	const { t } = useTranslation();

	if (!room) {
		return null;
	}
	const image = room.images.main;
	const restOfImages = room.images.gallery;
	const { female, male, other } = room.whoIsLiving.currentTenants;
	const peopleAmount = female + male + other;

	// Gallery with the main first
	const sortedImages = [restOfImages[image], ...restOfImages.filter((_, i) => i !== image)];
	return (
		<section className="grid md:grid-cols-2 gap-4 mx-auto max-w-4xl">
			<ul className="room-details-gallery">
				{sortedImages.map((src) => (
					<li key={src}>
						<RoomDetailsImage alt={room.title} src={src} />
					</li>
				))}
			</ul>

			<div className="flex flex-col gap-2 p-4">
				<ul className="flex items-center gap-4">
					<li>{t(room.rentType)}</li>
					<li>{t("roommates", { count: peopleAmount })}</li>
				</ul>
				<h1 className="text-pretty text-2xl max-md:max-w-md">{room.title}</h1>
				<span className="text-lg text-foreground/80"> {room.price.localePrice} </span>
				<p>{room.location.address}</p>
				<p className="text-foreground/80">{room.description}</p>
				<ul>
					<li className="flex gap-2">
						<HugeiconsIcon icon={ArrowAllDirectionIcon} />
						<span>
							{room.commodities.whole?.area}
							<span>m²</span>
						</span>
					</li>
				</ul>
			</div>

			<div className="p-4 border-t border-foreground/10 flex flex-col gap-2">
				<h3>Location</h3>
				<ul className="flex flex-wrap gap-2 divide-x divide-foreground/20 text-sm">
					<li className="pr-2">{room.location.address}</li>
					<li className="pr-2">{room.location.city}</li>
					<li className="pr-2">{room.location.country}</li>
				</ul>
				<MapWithMarker interactive={false} lat={room.location.lat} lon={room.location.lng} />
			</div>
		</section>
	);
}
