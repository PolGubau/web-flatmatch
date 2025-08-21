import { Sheet } from "react-modal-sheet";
import { useTinderCards } from "~/features/room/model/use-tinder-cards";
import RoomDetails from "~/features/room/ui/details/room-details";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";
import { LoadingSection } from "~/shared/components/LoadingSection";

export default function HomePage() {
	const { rooms, onSwipe, bottomDrawerRoom, handleCloseDrawer, isLoading } = useTinderCards();

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
						<Sheet.Content className="">
							{bottomDrawerRoom && <RoomDetails room={bottomDrawerRoom} />}
						</Sheet.Content>
					</Sheet.Container>
					<Sheet.Backdrop />
				</Sheet>

				{[...rooms].map((room, index) => (
					<RoomTinderCard index={index} key={room.id} onSwipe={onSwipe} room={room} />
				))}

				{rooms.length === 0 && (
					<div className="text-center text-neutral-500">
						No quedan habitaciones. Desliza para ver más.
					</div>
				)}
			</div>
		</div>
	);
}
