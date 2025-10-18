import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { RoomWithMetadata } from "~/entities/room/room";
import { RoomRepository } from "../../infra/room-repository";

/**
 * Hook para obtener rooms con paginación infinita.
 */
export const useListRoomsQuery = () => {
	const {
		data,
		isLoading,
		refetch,
		fetchNextPage,
		hasNextPage = false,
		isFetchingNextPage,
	} = useInfiniteQuery<RoomWithMetadata[], Error>({
		getNextPageParam: (lastPage, allPages) => {
			console.log("lastPage:", lastPage);
			console.log("allPages:", allPages);
			if (lastPage.length === 0) return undefined;
			return allPages.length; // la siguiente página es el número de páginas ya cargadas
		},

		initialPageParam: 0,

		queryFn: async ({ pageParam = 0 }) => {
			const rooms = await RoomRepository.findAll({ page: pageParam });
			console.log("Fetched rooms for page", pageParam, rooms);
			return rooms;
		},
		queryKey: ["rooms"],
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5, // cache 5min
	});

	const rooms = useMemo(() => data?.pages.flat() ?? [], [data]);
	return {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		refetch,
		rooms,
	};
};
