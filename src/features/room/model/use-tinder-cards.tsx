import { useState } from "react";
import type { Room } from "~/entities/room/room";
import { mockRooms } from "~/features/room/__mock__/rooms";
import type { SwipeDirection } from "~/features/room/types/common";
import { fetchRooms } from "../infra/room-api";
export const useTinderCards = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [isFetching, setIsFetching] = useState(false);


  function onSwipe(roomId: Room["id"], direction: SwipeDirection) {



    // 1. handle swipe action
    if (direction === "left") {
      console.log("Swiped left");
    } else {
      console.log("Swiped right");
    }

    // 2. Delete the swiped room
    setRooms(prev => prev.filter(r => r.id !== roomId));

    // Pre-fetch si quedan pocas y no estamos ya fetching
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
      const newRooms = await fetchRooms();

      const newRoomsWithRandomId = newRooms.map(r => ({
        ...r,
        id: crypto.randomUUID(), // 👈 clave: nuevo ID único para que React no recicle DOM
      }));

      setRooms(prev => [...prev, ...newRoomsWithRandomId]);
    } finally {
      setIsFetching(false);
    }
  }
  return { rooms, onSwipe };
}


