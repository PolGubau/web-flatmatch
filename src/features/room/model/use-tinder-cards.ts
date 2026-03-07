import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { RoomWithMetadata } from "~/entities/room/room";
import { logger } from "~/shared/utils/logger";
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

	const [searchParams] = useSearchParams();
	const searchParamsString = searchParams.toString();
	const previousSearchParamsRef = useRef<string>("");

	useEffect(() => {
		// Evitar refetch innecesarios en iOS comparando el string de searchParams
		if (previousSearchParamsRef.current === searchParamsString) {
			return;
		}

		previousSearchParamsRef.current = searchParamsString;

		try {
			logger.info("Refetching rooms due to search params change", {
				searchParams: searchParamsString,
			});
			void refetch();
		} catch (error) {
			logger.error("Error refetching rooms", error);
		}
	}, [searchParamsString, refetch]);

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

			// Calcula cuántas rooms quedarán después de eliminar la actual
			const remainingRooms = rooms.length - 1;

			// Solo carga más si quedan 2 o menos rooms y hay más páginas disponibles
			if (remainingRooms <= 2 && hasNextPage && !isFetchingNextPage) {
				console.info("Fetching next page, remaining rooms:", remainingRooms);
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
