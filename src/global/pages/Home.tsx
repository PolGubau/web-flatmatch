
import { useTinderCards } from "~/features/room/model/use-tinder-cards";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";



export default function HomePage() {
  const { rooms, onSwipe } = useTinderCards();

  return (
    <section className="grid place-items-center pt-10">
      {[...rooms].map((room, index) => (
        <RoomTinderCard
          key={room.id}
          room={room}
          onSwipe={onSwipe}
          index={index}
        />
      ))}

      {rooms.length === 0 && (
        <div className="text-center text-neutral-500">
          No quedan habitaciones. Desliza para ver más.
        </div>
      )}
    </section>
  )
}



