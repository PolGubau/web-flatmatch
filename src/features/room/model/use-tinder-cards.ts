import { useEffect, useState } from "react";
import type { Room, RoomWithVerification } from "~/entities/room/room";
import type { SwipeDirection } from "~/features/room/types/common";
import { RoomRepository } from "../infra/room-repository";
import { listRoomsQuery } from "./queries/list-rooms.query";
export const useTinderCards = () => {
	const [bottomDrawerRoom, setBottomDrawerRoom] = useState<null | RoomWithVerification>(null);

	const { rooms, isLoading } = listRoomsQuery();
	const [roomsChunk, setRoomsChunk] = useState<RoomWithVerification[]>(rooms);

	useEffect(() => {
		rooms && setRoomsChunk(rooms);
	}, [rooms]);

	const [isFetching, setIsFetching] = useState(false);

	function handleCloseDrawer() {
		setBottomDrawerRoom(null);
	}

	function getRoom(roomId: Room["id"]): RoomWithVerification | undefined {
		return rooms.find((r) => r.id === roomId);
	}

	function removeThisRoom(roomId: Room["id"]) {
		// 2. Delete the swiped room
		setRoomsChunk((prev) => prev.filter((r) => r.id !== roomId));
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
		setRoomsChunk((prev) => {
			if (prev.length <= 2 && !isFetching) {
				prefetchMoreRooms();
			}
			return prev;
		});
	}

	async function prefetchMoreRooms() {
		setIsFetching(true);
		try {
			const rooms = await RoomRepository.findAll();

			const newRoomsWithRandomId = rooms.map((r) => ({
				...r,
				id: crypto.randomUUID(),
			}));

			setRoomsChunk((prev) => [...prev, ...newRoomsWithRandomId]);
		} finally {
			setIsFetching(false);
		}
	}
	return { bottomDrawerRoom, handleCloseDrawer, isLoading, onSwipe, rooms: roomsChunk };
};
