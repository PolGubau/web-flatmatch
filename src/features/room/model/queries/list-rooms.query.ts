import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { RoomWithMetadata } from "~/entities/room/room";
import { CACHE_CONFIG, QUERY_KEYS } from "~/global/constants";
import { RoomRepository } from "../../infra/room-repository";
import type { Filters } from "../../ui/feed/filters/filters-form";
import { useFilters } from "../hooks/use-filters";

/**
 * Hook para obtener rooms con paginación infinita.
 */
export const useListRoomsQuery = () => {
	const [
		{
			location,
			maxPrice,
			minPrice,
			rentType,
			afterDate,
			// Amenidades
			hasWifi,
			hasAirConditioning,
			hasHeating,
			hasLaundry,
			hasElevator,
			hasDishwasher,
			hasTV,
			hasParking,
			hasTerrace,
			hasBalcony,
			hasGarden,
			hasPool,
			hasPrivateBathroom,
			hasWorkingDesk,
			isFurnished,
			isWheelchairAccessible,
		},
	] = useFilters();

	// Memoizar filtros para evitar recrear el objeto en cada render
	const memoizedFilters = useMemo<Filters>(
		() => ({
			afterDate,
			hasAirConditioning,
			hasBalcony,
			hasDishwasher,
			hasElevator,
			hasGarden,
			hasHeating,
			hasLaundry,
			hasParking,
			hasPool,
			hasPrivateBathroom,
			hasTerrace,
			hasTV,
			// Amenidades
			hasWifi,
			hasWorkingDesk,
			isFurnished,
			isWheelchairAccessible,
			location,
			maxPrice,
			minPrice,
			rentType,
		}),
		[
			afterDate,
			location,
			maxPrice,
			minPrice,
			rentType,
			hasWifi,
			hasAirConditioning,
			hasHeating,
			hasLaundry,
			hasElevator,
			hasDishwasher,
			hasTV,
			hasParking,
			hasTerrace,
			hasBalcony,
			hasGarden,
			hasPool,
			hasPrivateBathroom,
			hasWorkingDesk,
			isFurnished,
			isWheelchairAccessible,
		],
	);

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
			const page: number = (pageParam ?? 0) as number;
			console.log(
				"Fetching rooms with filters:",
				memoizedFilters,
				"page:",
				pageParam,
			);
			const rooms = await RoomRepository.findAll({
				filters: memoizedFilters,
				page,
			});
			return rooms;
		},
		// Include current filter values in the query key so React Query will
		// automatically refetch when filters change (driven by URL search params).
		queryKey: QUERY_KEYS.rooms.list({
			afterDate,
			location,
			maxPrice,
			minPrice,
		}),
		refetchOnWindowFocus: false,
		staleTime: CACHE_CONFIG.medium,
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
