import {
	ArrowAllDirectionIcon,
	BedDoubleIcon,
	CancelCircleIcon,
	FavouriteIcon,
	SecurityCheckIcon,
	Sink01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { RoomWithMetadata } from "~/entities/room/room";
import { commoditiesMap, extrasMap } from "~/shared/base/maps";
import { MapWithMarker } from "~/shared/components/map";
import { cn } from "~/shared/utils/utils";
import CopyRoomLinkButton from "./copy-room-link-button";
import { ContactButtons } from "./footer/contact-buttons";
import { RoomDetailsImage } from "./image";
import "./room-details.css";
import i18n from "i18next";
import { useNavigate } from "react-router";
import { useGetOrCreateConversationMutation } from "~/features/chat";
import { Button } from "~/shared/components/ui/button";
import { useSession } from "~/shared/context/session-context";
import type { TranslationKey } from "~/shared/i18n/i18n";
import type { RentType } from "~/shared/types/common";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";
import { getRoomPath } from "~/shared/utils/path/get-room-path";
import { useUpdateRoomInteraction } from "../../model/mutations/update-room-interaction";
import { RoomDistanceFromYou } from "./room-distance-from-you";

type Props = {
	room: RoomWithMetadata;
};

export default function RoomDetails({ room }: Props) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const createConversation = useGetOrCreateConversationMutation();
	const handleStartChat = async () => {
		const conversationId = await createConversation.mutateAsync({
			otherUserId: room.ownerId,
			roomId: room.id,
		});
		navigate(`/chat?conversationId=${conversationId}`);
	};
	const { check } = useSession();
	const { likeRoom, removeLikeRoom } = useUpdateRoomInteraction();
	if (!room) {
		return <p>Room not found</p>;
	}
	const cover = room?.images?.cover;
	const allImages = room?.images?.gallery;
	const { female, male, other } = room.whoIsLiving?.currentTenants ?? {
		female: 0,
		male: 0,
		other: 0,
	};
	const peopleAmount = female + male + other;
	const formattedPrice = currencyFormat(
		room.price.amount,
		room.price.currency,
		i18n.language,
	);
	const isFavourite = room?.interaction?.action === "like";

	const handleFavouriteClick = () => {
		check();
		if (isFavourite) {
			removeLikeRoom.mutate(room.id);
		} else {
			likeRoom.mutate({ action: "like", roomId: room.id });
		}
	};
	const getRentTypeLabel = (rentType: RentType): TranslationKey => {
		switch (rentType) {
			case "private-room":
				return "private_room";
			case "shared-room":
				return "shared_room";
			case "entire-flat":
				return "entire_flat";
			default:
				return "private_room";
		}
	};

	// Gallery with the main first
	const sortedImages = [cover, ...allImages.filter((path) => path !== cover)];
	return (
		<div className="relative overflow-y-auto h-full">
			<section className="grid gap-4 mx-auto max-w-7xl">
				<ul className="room-details-gallery max-h-[50vh] gap-2 w-full flex overflow-x-auto rounded-2xl px-2">
					{sortedImages.map((src) => (
						<li key={src}>
							<RoomDetailsImage alt={room.title} src={src} />
						</li>
					))}
				</ul>

				<div className="flex flex-col gap-8 px-4 relative">
					<header className=" gap-2 sticky top-0 bg-canvas z-10 flex flex-col">
						<div className="grid grid-cols-[1fr_auto] items-center gap-2">
							<div className="flex flex-col gap-1">
								<p className="text-lg text-foreground/80 flex gap-1 items-center">
									<span className="font-semibold text-2xl">
										{formattedPrice}
									</span>
									<span className="text-sm">
										/ {room.price.paymentFrequency}
									</span>
								</p>

								<ul className="flex items-center gap-4">
									<li>
										<span className="text-xs">
											{t(getRentTypeLabel(room.rentType))}
										</span>
									</li>
									<li>
										<span className="text-xs">
											{t("roommates", { count: peopleAmount })}
										</span>
									</li>
								</ul>
							</div>
							<nav className="flex items-center gap-2">
								<CopyRoomLinkButton />
								<Button onClick={handleStartChat}>
									Enviar mensaje al propietario
								</Button>

								<Button
									onClick={handleFavouriteClick}
									size={"icon"}
									type="button"
									variant={"ghost"}
								>
									<HugeiconsIcon
										className={cn("text-xl", {
											"fill-red-400": isFavourite,
										})}
										icon={FavouriteIcon}
										size={30}
									/>
								</Button>
							</nav>
						</div>

						<ContactButtons
							email={room.contact.agent?.email ?? room.contact.owner?.email}
							infoMessage={t("contact_message", {
								name: room.title,
								url: getRoomPath(room.id),
							})}
							phone={room.contact.agent?.phone ?? room.contact.owner?.phone}
						/>
					</header>
					<ul className="flex gap-8 items-center">
						<li className="flex flex-col gap-1 items-center">
							<HugeiconsIcon icon={BedDoubleIcon} size={28} />
							<span className="text-sm">
								{t("x_bedrooms", {
									count:
										room.commodities.whole?.bedrooms.individual +
										room.commodities.whole?.bedrooms.shared,
								})}
							</span>
						</li>
						<li className="flex flex-col gap-1 items-center">
							<HugeiconsIcon icon={Sink01Icon} size={28} />
							<span className="text-sm">
								{t("x_bathrooms", { count: room.commodities.whole?.bathrooms })}
							</span>
						</li>
						<li className="flex flex-col gap-1 items-center">
							<HugeiconsIcon
								className={cn({
									"text-error": !room.verification.verifiedAt,
									"text-success": !!room.verification.verifiedAt,
								})}
								icon={
									room.verification.verifiedAt
										? SecurityCheckIcon
										: CancelCircleIcon
								}
								size={28}
							/>
							<span className="text-sm">
								{t(room.verification.verifiedAt ? "verified" : "not_verified")}
							</span>
						</li>
					</ul>
					{/*  */}
					<div className="flex flex-col gap-1">
						<h1 className="text-pretty text-2xl max-md:max-w-md first-letter:capitalize font-semibold">
							{room.title}
						</h1>
						<p className="text-foreground/80 whitespace-pre-wrap break-words">
							{room.description}
						</p>
					</div>
					<article className="py-4 border-t border-foreground/10 flex flex-col gap-2">
						<h3>{t("commodities")}</h3>
						<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 items-center">
							{Object.keys(room?.commodities?.whole?.appliances).map((key) => {
								const value =
									room.commodities?.whole?.appliances[
										key as keyof typeof room.commodities.whole.appliances
									];
								const match =
									commoditiesMap[key as keyof typeof commoditiesMap];
								if (!match) {
									return;
								}
								return (
									<li
										className={cn("flex items-center gap-2 p-2 rounded-xl", {
											"bg-success/20": value,
											"opacity-50 bg-error/10": !value,
										})}
										key={key}
									>
										{match.icon && (
											<HugeiconsIcon icon={match.icon} size={25} />
										)}
										<span className="text-sm line-clamp-1 truncate">
											{t(match.label)}
										</span>
									</li>
								);
							})}
						</ul>
					</article>
					<article className="py-4 border-t border-foreground/10 flex flex-col gap-2">
						<h3>{t("extra_spaces")}</h3>
						<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 items-center">
							{Object.keys(room.commodities.whole.extras).map((key) => {
								const value =
									room.commodities.whole.extras[
										key as keyof typeof room.commodities.whole.extras
									];
								const match = extrasMap[key as keyof typeof extrasMap];
								if (!match) {
									return;
								}
								return (
									<li
										className={cn("flex items-center gap-2 p-2 rounded-xl", {
											"bg-success/20": value,
											"opacity-50 bg-error/10": !value,
										})}
										key={key}
									>
										{match.icon && (
											<HugeiconsIcon icon={match.icon} size={25} />
										)}
										<span className="text-sm line-clamp-1 truncate">
											{t(match.label)}
										</span>
									</li>
								);
							})}
						</ul>
					</article>
					<article className="py-4 border-t border-foreground/10 flex flex-col gap-2">
						<h3>{t("location")}</h3>
						<ul className="flex flex-wrap gap-2 divide-x divide-foreground/20 text-sm">
							<li className="pr-2">{room.location.address}</li>
							<li className="pr-2">{room.location.city}</li>
							<li className="pr-2">{room.location.country}</li>
							<li className="pr-2">
								<RoomDistanceFromYou
									lat={room.location.lat}
									lng={room.location.lng}
								/>
							</li>
						</ul>
						<MapWithMarker
							interactive={false}
							lat={room.location.lat}
							lon={room.location.lng}
						/>
					</article>
				</div>
			</section>
		</div>
	);
}
