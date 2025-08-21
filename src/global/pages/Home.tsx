import { Loading02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { Sheet } from "react-modal-sheet";
import { useTinderCards } from "~/features/room/model/use-tinder-cards";
import RoomDetails from "~/features/room/ui/details/room-details";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";

export default function HomePage() {
	const { t } = useTranslation();
	const { rooms, onSwipe, bottomDrawerRoom, handleCloseDrawer, isLoading } = useTinderCards();

	if (isLoading)
		return (
			<div className="w-full h-full grid place-items-center p-4">
				<div className="flex flex-col gap-2 items-center">
					<HugeiconsIcon className="animate-rotate" icon={Loading02Icon} />
					{t("loading")}
				</div>
			</div>
		);

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
						<Sheet.Content className="overflow-y-auto pb-10">
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
