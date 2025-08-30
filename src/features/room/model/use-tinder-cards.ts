import { useCallback, useEffect, useState } from "react";
import type { Room, RoomWithMetadata } from "~/entities/room/room";

import { RoomRepository } from "../infra/room-repository";
import type { SwipeDirection } from "../types/common";
import { listRoomsQuery } from "./queries/list-rooms.query";

export const useTinderCards = () => {
	const { rooms, isLoading } = listRoomsQuery();
	const [roomsChunk, setRoomsChunk] = useState<RoomWithMetadata[]>([]);
	const [bottomDrawerRoom, setBottomDrawerRoom] = useState<null | RoomWithMetadata>(null);
	const [isFetching, setIsFetching] = useState(false);

	// Inicializamos roomsChunk solo una vez
	useEffect(() => {
		console.log("rooms loaded", rooms.length);
		if (rooms?.length && roomsChunk.length === 0) {
			setRoomsChunk(rooms);
		}
	}, [rooms, roomsChunk.length]);

	const handleCloseDrawer = useCallback(() => {
		setBottomDrawerRoom(null);
	}, []);

	const getRoom = useCallback(
		(roomId: Room["id"]) => roomsChunk.find((r) => r.id === roomId),
		[roomsChunk],
	);

	const removeRoom = useCallback((roomId: Room["id"]) => {
		setRoomsChunk((prev) => prev.filter((r) => r.id !== roomId));
	}, []);

	const prefetchMoreRooms = useCallback(async () => {
		if (isFetching) return;
		setIsFetching(true);
		try {
			const fetchedRooms = await RoomRepository.findAll();
			const newRooms = fetchedRooms.map((r) => ({ ...r, id: crypto.randomUUID() }));
			setRoomsChunk((prev) => [...prev, ...newRooms]);
		} finally {
			setIsFetching(false);
		}
	}, [isFetching]);

	const onSwipe = useCallback(
		(roomId: Room["id"], direction: SwipeDirection) => {
			switch (direction) {
				case "left":
				case "right":
					removeRoom(roomId);
					break;
				case "up": {
					const room = getRoom(roomId);
					room && setBottomDrawerRoom(room);
					break;
				}
				case "down":
					console.log("Swiped down");
					break;
			}
			if (roomsChunk.length <= 2 && !isFetching) {
				prefetchMoreRooms();
			}
		},
		[getRoom, removeRoom, roomsChunk.length, isFetching, prefetchMoreRooms],
	);

	return { bottomDrawerRoom, handleCloseDrawer, isLoading, onSwipe, rooms: roomsChunk };
};
