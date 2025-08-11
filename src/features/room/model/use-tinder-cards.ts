import { useState } from "react";
import type { Room } from "~/entities/room/room";
import { mockRooms } from "~/features/room/__mock__/rooms";
import type { SwipeDirection } from "~/features/room/types/common";
import { RoomRepository } from "../infra/room-repository";
export const useTinderCards = () => {
	const [bottomDrawerRoom, setBottomDrawerRoom] = useState<null | Room>(null);

	const [rooms, setRooms] = useState<Room[]>(mockRooms);
	const [isFetching, setIsFetching] = useState(false);

	function handleCloseDrawer() {
		setBottomDrawerRoom(null);
	}

	function getRoom(roomId: string) {
		return rooms.find((r) => r.id === roomId);
	}

	function removeThisRoom(roomId: string) {
		// 2. Delete the swiped room
		setRooms((prev) => prev.filter((r) => r.id !== roomId));
	}

	function onSwipe(roomId: Room["id"], direction: SwipeDirection) {
		// 1. handle swipe action
		if (direction === "left") {
			removeThisRoom(roomId);
			alert("Swiped left");
		} else if (direction === "right") {
			removeThisRoom(roomId);
			alert("Swiped right");
		} else if (direction === "up") {
			const room = getRoom(roomId);
			room && setBottomDrawerRoom(room);
		} else if (direction === "down") {
			console.log("Swiped down");
		}

		// Pre-fetch si quedan pocas y no estamos ya fetching
		setRooms((prev) => {
			if (prev.length <= 2 && !isFetching) {
				prefetchMoreRooms();
			}
			return prev;
		});
	}

	async function prefetchMoreRooms() {
		setIsFetching(true);
		try {
			const newRooms = await RoomRepository.getAll();

			const newRoomsWithRandomId = newRooms.map((r) => ({
				...r,
				id: crypto.randomUUID(), // 👈 clave: nuevo ID único para que React no recicle DOM
			}));

			setRooms((prev) => [...prev, ...newRoomsWithRandomId]);
		} finally {
			setIsFetching(false);
		}
	}
	return { bottomDrawerRoom, handleCloseDrawer, onSwipe, rooms };
};
