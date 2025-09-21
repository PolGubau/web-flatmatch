import { RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { Sheet } from "react-modal-sheet";
import { useTinderCards } from "~/features/room/model/use-tinder-cards";
import { ContactButtons } from "~/features/room/ui/details/footer/contact-buttons";
import RoomDetails from "~/features/room/ui/details/room-details";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";
import { LoadingCardsSection } from "~/shared/components/pages/LoadingCardsSection";
import { Button } from "~/shared/components/ui/button";
import { Drawer } from "~/shared/components/ui/drawer";

export default function HomePage() {
	const {
		rooms,
		onSwipe,
		bottomDrawerRoom,
		handleCloseDrawer,
		isLoading,
		refetch,
	} = useTinderCards();

	if (isLoading) return <LoadingCardsSection />;

	return (
		<div className="grid grid-rows-1 grid-cols-1 gap-4 p-4 h-[80vh]">
			<div className="grid place-items-center pt-10">
				<Drawer
					className="max-w-7xl mx-auto"
					isOpen={!!bottomDrawerRoom}
					onClose={handleCloseDrawer}
				>
					{bottomDrawerRoom && <RoomDetails room={bottomDrawerRoom} />}
				</Drawer>

				{[...rooms].map((room, index) => (
					<RoomTinderCard
						index={index}
						key={room.id}
						onSwipe={onSwipe}
						room={room}
					/>
				))}

				{rooms.length === 0 && (
					<div className="text-center form text-foreground/60 max-w-md items-center">
						{t("there_are_no_more_rooms")}
						<Button disabled={isLoading} onClick={refetch}>
							<HugeiconsIcon icon={RefreshIcon} />
							{t("reload")}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
