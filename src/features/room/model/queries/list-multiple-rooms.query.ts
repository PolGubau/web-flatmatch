import { useQuery } from "@tanstack/react-query";
import type { Room } from "~/entities/room/room";
import { QUERY_KEYS } from "~/global/constants";
import { listMultipleRoomsService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type ListRoomResponse = {
	isLoading: boolean;
	rooms: Room[];
};

type ListRoomQuery = (ids: string[]) => ListRoomResponse;

export const listMultipleRoomsQuery: ListRoomQuery = (ids) => {
	const { data, isLoading } = useQuery<Room[]>({
		queryFn: () => listMultipleRoomsService(ids),
		queryKey: QUERY_KEYS.rooms.multiple(ids),
	});

	return { isLoading, rooms: data ?? [] };
};
