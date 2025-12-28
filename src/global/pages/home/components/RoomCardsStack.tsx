import type { RoomWithMetadata } from "~/entities/room/room";
import type { SwipeDirection } from "~/features/room/types/common";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";

type RoomCardsStackProps = {
  rooms: RoomWithMetadata[];
  onSwipe: (roomId: string, direction: SwipeDirection) => void;
};

export const RoomCardsStack = ({ rooms, onSwipe }: RoomCardsStackProps) => {
  return (
    <div className="relative h-full w-full max-w-lg grid justify-center">
      {rooms.map((room, index) => (
        <RoomTinderCard
          index={index}
          key={room.id}
          onSwipe={onSwipe}
          room={room}
        />
      ))}
    </div>
  );
};