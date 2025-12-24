import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { RoomWithMetadata } from "~/entities/room/room";
import { commoditiesMap, extrasMap } from "~/shared/base/maps";
import { MapWithMarker } from "~/shared/components/map";
import { Badge } from "~/shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { cn } from "~/shared/utils/utils";
import "./room-details.css";
import { AvailabilityCostsCard } from "./components/AvailabilityCostsCard";
import { OwnerSidebar } from "./components/OwnerSidebar";
import { QuickStatsCard } from "./components/QuickStatsCard";
import { RoomGallery } from "./components/RoomGallery";
import { RoomHeaderCard } from "./components/RoomHeaderCard";
import { useRoomDetailsActions } from "./hooks/useRoomDetailsActions";
import { useRoomDetailsData } from "./hooks/useRoomDetailsData";
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
		roommatesData,
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

	const bedrooms =
		room.commodities.whole?.bedrooms.individual +
		room.commodities.whole?.bedrooms.shared;

	return (
		<div className="relative overflow-y-auto h-full">
			<section className="grid gap-4 md:gap-6 mx-auto max-w-7xl pb-8 px-4">
				{/* Gallery */}
				<RoomGallery images={sortedImages} title={room.title} />

				<div className="flex flex-col lg:flex-row gap-4 md:gap-6">
					{/* Main Content */}
					<div className="flex-1 flex flex-col gap-4 md:gap-6">
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

						{/* Quick Stats */}
						<QuickStatsCard
							bathrooms={room.commodities.whole?.bathrooms}
							bedrooms={bedrooms}
							roommates={roommatesData.total}
						/>

						{/* Description */}
						<Card>
							<CardHeader>
								<CardTitle>About this place</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-foreground/80 whitespace-pre-wrap break-words leading-relaxed">
									{room.description}
								</p>
							</CardContent>
						</Card>

						{/* Availability & Costs */}
						<AvailabilityCostsCard
							availableFrom={availableFrom}
							currency={room.price.currency}
							deposit={room.price.additionalCosts.deposit}
							minimumStay={minimumStay}
						/>

						{/* Amenities */}
						<Card>
							<CardHeader>
								<CardTitle>{t("commodities")}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
									{Object.keys(room?.commodities?.whole?.appliances).map(
										(key) => {
											const value =
												room.commodities?.whole?.appliances[
												key as keyof typeof room.commodities.whole.appliances
												];
											const match =
												commoditiesMap[key as keyof typeof commoditiesMap];
											if (!match) return null;

											return (
												<div
													className={cn(
														"flex items-center gap-3 p-3 rounded-lg border transition-colors",
														{
															"bg-success/10 border-success/30": value,
															"opacity-40 bg-muted border-muted": !value,
														},
													)}
													key={key}
												>
													{match.icon && (
														<HugeiconsIcon
															className={
																value ? "text-success" : "text-muted-foreground"
															}
															icon={match.icon}
															size={20}
														/>
													)}
													<span className="text-sm font-medium">
														{t(match.label)}
													</span>
												</div>
											);
										},
									)}
								</div>
							</CardContent>
						</Card>

						{/* Extra Spaces */}
						<Card>
							<CardHeader>
								<CardTitle>{t("extra_spaces")}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
									{Object.keys(room.commodities.whole.extras).map((key) => {
										const value =
											room.commodities.whole.extras[
											key as keyof typeof room.commodities.whole.extras
											];
										const match = extrasMap[key as keyof typeof extrasMap];
										if (!match) return null;

										return (
											<div
												className={cn(
													"flex items-center gap-3 p-3 rounded-lg border transition-colors",
													{
														"bg-success/10 border-success/30": value,
														"opacity-40 bg-muted border-muted": !value,
													},
												)}
												key={key}
											>
												{match.icon && (
													<HugeiconsIcon
														className={
															value ? "text-success" : "text-muted-foreground"
														}
														icon={match.icon}
														size={20}
													/>
												)}
												<span className="text-sm font-medium">
													{t(match.label)}
												</span>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>

						{/* House Rules */}
						{room.rules && (
							<Card>
								<CardHeader>
									<CardTitle>House Rules</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{Object.entries(room.rules).map(([key, value]) => {
											if (typeof value === "boolean") {
												return (
													<div
														className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
														key={key}
													>
														<span className="text-sm font-medium capitalize">
															{key.replace(/([A-Z])/g, " $1").trim()}
														</span>
														<Badge variant={value ? "success" : "secondary"}>
															{value ? "Allowed" : "Not allowed"}
														</Badge>
													</div>
												);
											}
											return null;
										})}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Preferences */}
						{room.preferences && (
							<Card>
								<CardHeader>
									<CardTitle>Tenant Preferences</CardTitle>
									<CardDescription>
										Landlord preferences for potential tenants
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{room.preferences.age && (
											<div className="flex items-center justify-between py-2">
												<span className="text-sm font-medium">Age range</span>
												<Badge variant="secondary">
													{room.preferences.age.min} -{" "}
													{room.preferences.age.max} years
												</Badge>
											</div>
										)}
										{room.preferences.gender && (
											<div className="py-2">
												<span className="text-sm font-medium block mb-2">
													Gender preference
												</span>
												<div className="flex flex-wrap gap-2">
													{room.preferences.gender.female && (
														<Badge variant="outline">Female</Badge>
													)}
													{room.preferences.gender.male && (
														<Badge variant="outline">Male</Badge>
													)}
													{room.preferences.gender.non_binary && (
														<Badge variant="outline">Non-binary</Badge>
													)}
													{room.preferences.gender.prefer_not_to_say && (
														<Badge variant="outline">Any</Badge>
													)}
												</div>
											</div>
										)}
										{room.preferences.currentOccupation && (
											<div className="py-2">
												<span className="text-sm font-medium block mb-2">
													Preferred occupation
												</span>
												<div className="flex flex-wrap gap-2">
													{room.preferences.currentOccupation.student && (
														<Badge variant="outline">Student</Badge>
													)}
													{room.preferences.currentOccupation.employed && (
														<Badge variant="outline">Employed</Badge>
													)}
													{room.preferences.currentOccupation.unemployed && (
														<Badge variant="outline">Unemployed</Badge>
													)}
												</div>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Location */}
						<Card>
							<CardHeader>
								<CardTitle>{t("location")}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-2 text-sm">
									<Badge variant="secondary">{room.location.address}</Badge>
									<Badge variant="secondary">{room.location.city}</Badge>
									<Badge variant="secondary">{room.location.country}</Badge>
									<Badge variant="outline">
										<RoomDistanceFromYou
											lat={room.location.lat}
											lng={room.location.lng}
										/>
									</Badge>
								</div>
								<MapWithMarker
									interactive={false}
									lat={room.location.lat}
									lon={room.location.lng}
								/>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar - Owner Info (Desktop) */}
					<OwnerSidebar
						contactEmail={
							room.contact.agent?.email ?? room.contact.owner?.email
						}
						contactPhone={
							room.contact.agent?.phone ?? room.contact.owner?.phone
						}
						onStartChat={handleStartChat}
						owner={room.owner}
						roomId={room.id}
						roommates={roommatesData}
						roomTitle={room.title}
					/>
				</div>
			</section>
		</div>
	);
}
