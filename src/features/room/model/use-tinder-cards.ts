import { type InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type { RoomWithMetadata } from "~/entities/room/room";
import type { SwipeDirection } from "../types/common";
import { useSwipeActions } from "./hooks/useSwipeActions";
import { useListRoomsQuery } from "./queries/list-rooms.query";

/**
 * Hook principal para gestionar la lógica de swipe, drawer y paginación.
 */
export const useTinderCards = () => {
	const {
		rooms,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		refetch,
		hasNextPage,
	} = useListRoomsQuery();

	const [bottomDrawerRoom, setBottomDrawerRoom] =
		useState<RoomWithMetadata | null>(null);

	const handleCloseDrawer = useCallback(() => setBottomDrawerRoom(null), []);

	const handleOpenDetails = useCallback(
		(roomId: string) => {
			const room = rooms.find((r) => r.id === roomId);
			if (room) setBottomDrawerRoom(room);
		},
		[rooms],
	);

	const { handleSwipe } = useSwipeActions({ onOpenDetails: handleOpenDetails });

	const onSwipe = useCallback(
		(roomId: string, dir: SwipeDirection) => {
			console.info("onSwipe called with:", { dir, roomId });
			if (rooms.length > 0) handleSwipe(roomId, dir);

			// carga siguiente chunk si quedan pocas
			if (rooms.length <= 3 && hasNextPage && !isFetchingNextPage) {
				void fetchNextPage();
			}
		},
		[handleSwipe, rooms.length, hasNextPage, isFetchingNextPage, fetchNextPage],
	);

	return {
		bottomDrawerRoom,
		handleCloseDrawer,
		isLoading,
		onSwipe,
		refetch,
		rooms,
	};
};
