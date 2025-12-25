import { useTranslation } from "react-i18next";
import type { RoomWithMetadata } from "~/entities/room/room";
import { commoditiesMap, extrasMap } from "~/shared/base/maps";
import { MapWithMarker } from "~/shared/components/map";
import { AvailabilityCostsCard } from "./components/AvailabilityCostsCard";
import { FeaturesList } from "./components/FeaturesList";
import { HouseRulesCard } from "./components/HouseRulesCard";
import { RoomGallery } from "./components/RoomGallery";
import { RoomHeaderCard } from "./components/RoomHeaderCard";
import { TenantPreferencesCard } from "./components/TenantPreferencesCard";
import { useRoomDetailsActions } from "./hooks/useRoomDetailsActions";
import { useRoomDetailsData } from "./hooks/useRoomDetailsData";
import "./room-details.css";
import { ChattingIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ProfileAvatar } from "~/features/user/ui/profile/avatar";
import { Button } from "~/shared/components/ui/button";
import { RoomActionsBar } from "./components/RoomActionsBar";
import { RoomDistanceFromYou } from "./room-distance-from-you";
import { createShareData } from "./utils/room-details.utils";

type Props = {
	room: RoomWithMetadata;
};

export default function RoomDetails({ room }: Props) {
	const { t } = useTranslation();

	// Data layer - Extract computed values
	const {
		sortedImages,
		formattedPrice,
		isFavourite,
		availableFrom,
		minimumStay,
	} = useRoomDetailsData(room);

	// Actions layer - Handle user interactions
	const { handleStartChat, handleFavouriteClick, handleShare, isSharing } =
		useRoomDetailsActions({
			isFavourite,
			ownerId: room.owner.id,
			roomId: room.id,
		});

	if (!room) {
		return <p>Room not found</p>;
	}

	const onShare = () => {
		const shareData = createShareData(
			room.title,
			formattedPrice,
			room.price.paymentFrequency,
			window.location.href,
		);
		handleShare(shareData);
	};

	return (
		<section className="grid relative gap-4 md:gap-6 mx-auto max-w-7xl">
			{/* Gallery */}
			<RoomGallery images={sortedImages} title={room.title} />

			<div className="flex-1 flex flex-col gap-4">
				{/* Header with price and actions */}
				<RoomHeaderCard
					formattedPrice={formattedPrice}
					isFavourite={isFavourite}
					isSharing={isSharing}
					onChat={handleStartChat}
					onFavouriteToggle={handleFavouriteClick}
					onShare={onShare}
					room={room}
				/>

				<p className="text-foreground/80 whitespace-pre-wrap break-words leading-relaxed">
					{room.description}
				</p>
				<section className="grid grid-cols-[1fr_2fr] gap-3 items-center">
					<div className="flex gap-6 items-center">
						<ProfileAvatar
							avatarUrl={room.owner.avatar}
							name={room.owner.name}
							size="lg"
						/>
						<div className="flex flex-col">
							<p>{t("landlord")}</p>
							<h3 className="font-semibold text-lg">{room.owner.name}</h3>
						</div>
					</div>
					<div>
						<Button onClick={handleStartChat} size={"sm"}>
							<HugeiconsIcon icon={ChattingIcon} size={20} />
							{t("start_chatting")}
						</Button>
					</div>
				</section>
				{/* Availability & Costs */}
				<AvailabilityCostsCard
					availableFrom={availableFrom}
					currency={room.price.currency}
					deposit={room.price.additionalCosts.deposit}
					minimumStay={minimumStay}
				/>

				{/* Amenities */}
				<FeaturesList
					features={Object.keys(room?.commodities?.whole?.appliances)
						.map((key) => {
							const value =
								room.commodities?.whole?.appliances[
								key as keyof typeof room.commodities.whole.appliances
								];
							const match =
								commoditiesMap[key as keyof typeof commoditiesMap];
							return {
								icon: match?.icon,
								key,
								label: match?.label,
								value: !!value,
							};
						})
						.filter((feature) => feature.label)}
					title={t("commodities")}
				/>

				{/* Extra Spaces */}
				<FeaturesList
					features={Object.keys(room.commodities.whole.extras)
						.map((key) => {
							const value =
								room.commodities.whole.extras[
								key as keyof typeof room.commodities.whole.extras
								];
							const match = extrasMap[key as keyof typeof extrasMap];
							return {
								icon: match?.icon,
								key,
								label: match?.label,
								value: !!value,
							};
						})
						.filter((feature) => feature.label)}
					title={t("extra_spaces")}
				/>

				{/* House Rules */}
				{room.rules && <HouseRulesCard rules={room.rules} />}

				{/* Preferences */}
				{room.preferences && (
					<TenantPreferencesCard preferences={room.preferences} />
				)}

				<section className="space-y-4 border-t border-foreground/10 pt-6 mt-8">
					<header>
						<h3 className="text-xl">{t("location")}</h3>
					</header>
					<div className="flex flex-wrap gap-2 text-sm">
						<p>{room.location.address}</p>
						<RoomDistanceFromYou
							lat={room.location.lat}
							lng={room.location.lng}
						/>
					</div>
					<MapWithMarker lat={room.location.lat} lon={room.location.lng} />
				</section>
			</div>
			<RoomActionsBar
				isFavourite={isFavourite}
				isSharing={isSharing}
				onChat={handleStartChat}
				onFavouriteToggle={handleFavouriteClick}
				onShare={onShare}
			/>
		</section>
	);
}
