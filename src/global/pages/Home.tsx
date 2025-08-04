import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import type { Room } from "~/entities/room/room";
import { mockRooms } from "~/features/room/__mock__/rooms";

type SwipeDirection = "left" | "right";

const useTinderCards = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [isFetching, setIsFetching] = useState(false);


  function onSwipe(roomId: Room["id"], direction: SwipeDirection) {
    setRooms(prev => prev.filter(r => r.id !== roomId));

    // Pre-fetch si quedan pocas y no estamos ya fetchando
    setRooms(prev => {
      if (prev.length <= 2 && !isFetching) {
        prefetchMoreRooms();
      }
      return prev;
    });
  }

  async function prefetchMoreRooms() {
    setIsFetching(true);
    try {
      const newRooms = await fetchRoomsFromAPI(); // o usar mockRooms por 

      const newRoomsWithRandomId = newRooms.map(r => ({
        ...r,
        id: crypto.randomUUID(), // 👈 clave: nuevo ID único para que React no recicle DOM
      }));

      setRooms(prev => [...prev, ...newRoomsWithRandomId]);
    } finally {
      setIsFetching(false);
      alert("Más habitaciones cargadas");
    }
  }



  async function fetchRoomsFromAPI(): Promise<Room[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockRooms.map(room => ({
        ...room,
        id: crypto.randomUUID(), // para no colisionar
      }))), 500);
    });
  }


  return { rooms, onSwipe };
}
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
          total={rooms.length}
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



type RoomTinderCardProps = {
  room: Room;
  onSwipe: (roomId: Room["id"], direction: SwipeDirection) => void;
  index: number;
  total: number;

}
export const RoomTinderCard = ({ room, onSwipe, index, total }: RoomTinderCardProps) => {

  const isFront = index === 0;

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0.2, 1, 0.2]);
  const rotateRaw = useTransform(x, [-150, 150], [-10, 10]);
  const size = useTransform(x, [-150, 0, 150], [0.9, 1, 0.9]);


  const rotate = useTransform(() => {
    const amount = 5
    const offset = isFront ? 0 : index % 2 === 0 ? -amount : amount;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: { offset: { x: number; y: number } }) => {
    if (Math.abs(info.offset.x) > 150) {
      // Handle swipe left or right
      console.log("Swiped", info.offset.x > 0 ? "right" : "left");
      onSwipe(room.id, info.offset.x > 0 ? "right" : "left");
    }
  }

  return (<motion.div className="bg-red-300 p-2 h-full w-[80vw] max-w-[800px] rounded-lg hover:cursor-grab active:cursor-grabbing origin-bottom"
    drag="x"
    dragElastic={0.2}
    dragConstraints={{ left: 0, right: 0 }}
    style={{
      gridRow: 1,
      aspectRatio: 16 / 9,
      gridColumn: 1, x, opacity, rotate: rotate, scale: size,
      transition: "0.125s transform",
      zIndex: 1000 - index,
      pointerEvents: isFront ? "auto" : "none", // la de arriba es la interactiva

    }}
    onDragEnd={handleDragEnd}>
    {index} - {room.id}
    <img className="h-full w-full rounded-lg pointer-events-none object-cover"
      src={room.images.gallery[room.images.main]} alt={room.title}
    />

  </motion.div>)
}