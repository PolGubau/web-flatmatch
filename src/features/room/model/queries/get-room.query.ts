import { useQuery } from "@tanstack/react-query";
import type { RoomWithMetadata } from "~/entities/room/room";
import { QUERY_KEYS } from "~/global/constants";
import { getRoomService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type GetRoomResponse = {
	isLoading: boolean;
	room: RoomWithMetadata | null;
	refetch: () => void;
};
type GetRoom = (id: string) => GetRoomResponse;

export const getRoomQuery: GetRoom = (id) => {
	const { data, isLoading, refetch } = useQuery<RoomWithMetadata | null>({
		enabled: !!id,
		queryFn: () => getRoomService(id),
		queryKey: QUERY_KEYS.rooms.detail(id),
	});
	const room = data ?? null;

	return { isLoading, refetch, room };
};
