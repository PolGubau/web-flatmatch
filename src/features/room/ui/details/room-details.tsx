import {
	ArrowAllDirectionIcon,
	BedDoubleIcon,
	CancelCircleIcon,
	FavouriteIcon,
	Mail01Icon,
	SecurityCheckIcon,
	Sink01Icon,
	TelephoneIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { Room } from "~/entities/room/room";
import { mockUsers } from "~/features/user/__mock__/users";
import { MapWithMarker } from "~/shared/components/map";
import { Button } from "~/shared/components/ui/button";
import { cn } from "~/shared/utils/utils";
import CopyRoomLinkButton from "./copy-room-link-button";
import { RoomDetailsImage } from "./image";
import "./room-details.css";
import { commoditiesMap, extrasMap } from "~/shared/base/commodities";
import { ContactButtons } from "./footer/contact-buttons";

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

	const user = mockUsers[0];
	const isFavourite = user.savedRoomIds?.includes(room.id);

	// Gallery with the main first
	const sortedImages = [restOfImages[image], ...restOfImages.filter((_, i) => i !== image)];
	return (
		<div className="relative overflow-y-auto h-full">
			<section className="grid md:grid-cols-2 gap-4 mx-auto max-w-4xl">
				<ul className="room-details-gallery md:sticky md:top-0">
					{sortedImages.map((src) => (
						<li key={src}>
							<RoomDetailsImage alt={room.title} src={src} />
						</li>
					))}
				</ul>

				<div className="flex flex-col gap-8 px-4">
					<header className="grid grid-cols-[1fr_auto] gap-2 items-center">
						<div className="flex flex-col gap-1">
							<p className="text-lg text-foreground/80 flex gap-1 items-center">
								<span className="font-semibold text-xl">{room.price.localePrice}</span>
								<span className="text-sm"> / {room.price.paymentFrequency}</span>
							</p>

							<ul className="flex items-center gap-4">
								<li>
									<span className="text-xs">{t(room.rentType)}</span>
								</li>
								<li>
									<span className="text-xs">{t("roommates", { count: peopleAmount })}</span>
								</li>
							</ul>
						</div>
						<nav className="flex items-center gap-2">
							<CopyRoomLinkButton />

							<button type="button">
								<HugeiconsIcon
									className={cn({
										"fill-red-400": isFavourite,
									})}
									icon={FavouriteIcon}
									size={25}
								/>
							</button>
						</nav>
					</header>
					<ul className="flex gap-8 items-center">
						<li className="flex flex-col gap-1 items-center">
							<HugeiconsIcon icon={BedDoubleIcon} size={32} />
							<span className="text-sm">
								{t("bedrooms", {
									count:
										room.commodities.whole?.bedrooms.individual +
										room.commodities.whole?.bedrooms.shared,
								})}
							</span>
						</li>
						<li className="flex flex-col gap-1 items-center">
							<HugeiconsIcon icon={ArrowAllDirectionIcon} size={32} />
							<span className="text-sm">
								{t("square_meters", { count: room.commodities.whole?.area })}
							</span>
						</li>
						<li className="flex flex-col gap-1 items-center">
							<HugeiconsIcon icon={Sink01Icon} size={32} />
							<span className="text-sm">
								{t("bathrooms", { count: room.commodities.whole?.bathrooms })}
							</span>
						</li>
						<li className="flex flex-col gap-1 items-center">
							<HugeiconsIcon
								className={cn({
									"text-error": !room.isVerified,
									"text-success": room.isVerified,
								})}
								icon={room.isVerified ? SecurityCheckIcon : CancelCircleIcon}
								size={32}
							/>
							<span className="text-sm">{t(room.isVerified ? "verified" : "not_verified")}</span>
						</li>
					</ul>
					{/*  */}
					<h1 className="text-pretty text-2xl max-md:max-w-md">{room.title}</h1>
					<p className="text-foreground/80">{room.description}</p>
					<article className="p-4 border-t border-foreground/10 flex flex-col gap-2">
						<h3>{t("commodities")}</h3>
						<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 items-center">
							{Object.keys(room.commodities.whole.appliances).map((key) => {
								const match = commoditiesMap[key as keyof typeof commoditiesMap];
								return (
									<li className="flex items-center gap-2" key={key}>
										<HugeiconsIcon icon={match.icon} size={25} />
										<span className="text-sm line-clamp-1 truncate">{t(match.label)}</span>
									</li>
								);
							})}
						</ul>
					</article>
					<article className="p-4 border-t border-foreground/10 flex flex-col gap-2">
						<h3>{t("extra_spaces")}</h3>
						<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 items-center">
							{Object.keys(room.commodities.whole.extras).map((key) => {
								const match = extrasMap[key as keyof typeof extrasMap];
								if (!match) {
									return;
								}
								return (
									<li className="flex items-center gap-2" key={key}>
										<HugeiconsIcon icon={match.icon} size={25} />
										<span className="text-sm line-clamp-1 truncate">{t(match.label)}</span>
									</li>
								);
							})}
						</ul>
					</article>
					<article className="p-4 border-t border-foreground/10 flex flex-col gap-2">
						<h3>{t("location")}</h3>
						<ul className="flex flex-wrap gap-2 divide-x divide-foreground/20 text-sm">
							<li className="pr-2">{room.location.address}</li>
							<li className="pr-2">{room.location.city}</li>
							<li className="pr-2">{room.location.country}</li>
						</ul>
						<MapWithMarker interactive={false} lat={room.location.lat} lon={room.location.lng} />
					</article>
				</div>
			</section>
			<footer
				className="sticky bottom-0 bg-canvas p-4 mx-auto md:max-w-4xl"
				style={{ zIndex: 1001 }}
			>
				<ContactButtons
					email={room.contact.agent?.email ?? room.contact.owner?.email}
					phone={room.contact.agent?.phone ?? room.contact.owner?.phone}
				/>
			</footer>
		</div>
	);
}
