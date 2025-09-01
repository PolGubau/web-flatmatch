import { RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sheet } from "react-modal-sheet";
import { useTinderCards } from "~/features/room/model/use-tinder-cards";
import RoomDetails from "~/features/room/ui/details/room-details";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";
import { Button } from "~/shared/components/ui/button";

export default function HomePage() {
	const { rooms, onSwipe, bottomDrawerRoom, handleCloseDrawer, isLoading, refetch } =
		useTinderCards();

	if (isLoading) return <LoadingSection />;

	return (
		<div className="grid grid-rows-1 grid-cols-1 gap-4 p-4 h-[80vh]">
			<div className="grid place-items-center pt-10">
				<Sheet
					isOpen={!!bottomDrawerRoom}
					modalEffectRootId="modal-root"
					onClose={handleCloseDrawer}
				>
					<Sheet.Container>
						<Sheet.Header />
						<Sheet.Content className="bg-canvas">
							{bottomDrawerRoom && <RoomDetails room={bottomDrawerRoom} />}
						</Sheet.Content>
					</Sheet.Container>
					<Sheet.Backdrop />
				</Sheet>

				{[...rooms].map((room, index) => (
					<RoomTinderCard index={index} key={room.id} onSwipe={onSwipe} room={room} />
				))}

				{rooms.length === 0 && (
					<div className="text-center form text-foreground/60 max-w-md items-center">
						No quedan habitaciones. Desliza para ver más.
						<Button disabled={isLoading} onClick={refetch}>
							<HugeiconsIcon icon={RefreshIcon} />
							Recargar
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
