import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { RoomWithMetadata } from "~/entities/room/room";
import { RoomRepository } from "../../infra/room-repository";
import type { Filters } from "../../ui/feed/filters/filters-form";
import { useFilters } from "../hooks/use-filters";

/**
 * Hook para obtener rooms con paginación infinita.
 */
export const useListRoomsQuery = () => {
	const [{ location, maxPrice, minPrice, rentType, afterDate }] = useFilters();

	const {
		data,
		isLoading,
		refetch,
		fetchNextPage,
		hasNextPage = false,
		isFetchingNextPage,
	} = useInfiniteQuery<RoomWithMetadata[], Error>({
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length === 0) return undefined;
			return allPages.length; // la siguiente página es el número de páginas ya cargadas
		},

		initialPageParam: 0,

		queryFn: async ({ pageParam = 0 }) => {
			const filters: Filters = {
				afterDate: afterDate,
				location: location,
				maxPrice: maxPrice,
				minPrice: minPrice,
				rentType: rentType,
			};
			const page: number = (pageParam ?? 0) as number;
			console.log("Fetching rooms with filters:", filters, "page:", pageParam);
			const rooms = await RoomRepository.findAll({ filters, page });
			return rooms;
		},
		// Include current filter values in the query key so React Query will
		// automatically refetch when filters change (driven by URL search params).
		queryKey: ["rooms", { afterDate, location, maxPrice, minPrice }],
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
