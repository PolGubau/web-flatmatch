import type { RoomWithMetadata } from "~/entities/room/room";
import type { SwipeDirection } from "~/features/room/types/common";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";
import { ErrorBoundary } from "~/shared/components/error-boundary/error-boundary";
import { logger } from "~/shared/utils/logger";

type RoomCardsStackProps = {
  rooms: RoomWithMetadata[];
  onSwipe: (roomId: string, direction: SwipeDirection) => void;
};

const MAX_VISIBLE_CARDS = 3;

export const RoomCardsStack = ({ rooms, onSwipe }: RoomCardsStackProps) => {
  const handleReset = () => {
    logger.info("RoomCardsStack error boundary reset");
    window.location.reload();
  };

  return (
    <ErrorBoundary
      context={{ roomsCount: rooms.length }}
      name="RoomCardsStack"
      onReset={handleReset}
    >
      <div className="relative h-full w-full max-w-lg grid justify-center">
        {rooms.slice(0, MAX_VISIBLE_CARDS).map((room, index) => (
          <RoomTinderCard
            index={index}
            key={room.id}
            onSwipe={onSwipe}
            room={room}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
};
