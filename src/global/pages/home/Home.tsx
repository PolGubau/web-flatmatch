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
			<section className="flex flex-col h-full overflow-hidden">
				<div className="flex-1 flex items-center justify-center px-4 min-h-0">
					{thereAreRooms ? (
						<>
							<div className="flex flex-col gap-2 w-full h-full items-center justify-center min-h-0">
								<div className="flex-1 w-full min-h-0 flex items-center justify-center">
									<RoomCardsStack onSwipe={onSwipe} rooms={rooms} />
								</div>
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
