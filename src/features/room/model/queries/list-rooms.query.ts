import { useQuery } from "@tanstack/react-query";
import type { RoomWithMetadata } from "~/entities/room/room";
import { listAllRoomsService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type ListRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithMetadata[];
	refetch: () => void;
};

type ListRoomQuery = () => ListRoomResponse;

export const listRoomsQuery: ListRoomQuery = () => {
	const { data, isLoading, refetch } = useQuery<RoomWithMetadata[]>({
		initialData: [],
		queryFn: listAllRoomsService,
		queryKey: ["rooms"],
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	return { isLoading, refetch, rooms: data ?? [] };
};
