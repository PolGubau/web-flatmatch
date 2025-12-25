import { useTinderCards } from "~/features/room/model/use-tinder-cards";
import { ErrorBoundary } from "~/shared/components/error-boundary/error-boundary";
import { LoadingCardsSection } from "~/shared/components/pages/LoadingCardsSection";
import { EmptyRoomsState } from "./components/EmptyRoomsState";
import { RoomCardsStack } from "./components/RoomCardsStack";
import { RoomDetailsDrawer } from "./components/RoomDetailsDrawer";
import { SwipeActions } from "./components/SwipeActions";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

export default function HomePage() {
	const {
		rooms,
		onSwipe,
		bottomDrawerRoom,
		handleCloseDrawer,
		isLoading,
		refetch,
	} = useTinderCards();

	const thereAreRooms = rooms.length > 0 && !isLoading;
	const currentRoom = rooms[0];

	// Keyboard shortcuts handler
	useKeyboardShortcuts({
		currentRoom,
		isEnabled: thereAreRooms,
		onSwipe,
	});

	if (isLoading) return <LoadingCardsSection />;

	return (
		<ErrorBoundary onReset={refetch}>
			<section className="grid grid-rows-[1fr_auto] gap-4 h-full overflow-hidden">
				<div className="grid grid-rows-1 grid-cols-1 mx-auto place-items-center px-4 h-full">
					{thereAreRooms ? (
						<>
							<div className="grid grid-rows-[1fr_auto] gap-3 h-full w-full items-center max-h-[calc(100dvh-8rem)] md:max-h-[min(1000px,calc(100dvh-10rem))] min-h-0">
								<RoomCardsStack onSwipe={onSwipe} rooms={rooms} />
								<SwipeActions
									disabled={isLoading}
									onSwipe={(direction) => onSwipe(currentRoom.id, direction)}
								/>
							</div>
							<RoomDetailsDrawer
								onClose={handleCloseDrawer}
								room={bottomDrawerRoom}
							/>
						</>
					) : (
						<EmptyRoomsState isLoading={isLoading} onRefetch={refetch} />
					)}
				</div>
			</section>
		</ErrorBoundary>
	);
}
