import { useQuery } from "@tanstack/react-query";
import type { RoomWithMetadata } from "~/entities/room/room";
import { QUERY_KEYS } from "~/global/constants";
import { listUserRoomsService } from "../services/room.service";

/**
 * Hook para obtener las rooms de un usuario específico usando React Query.
 */

type UserRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithMetadata[];
};

type UserRoomQuery = (userId: string) => UserRoomResponse;

export const listUserRoomsQuery: UserRoomQuery = (userId) => {
	const { data, isLoading } = useQuery<RoomWithMetadata[]>({
		enabled: !!userId,
		queryFn: () => listUserRoomsService(userId),
		queryKey: [...QUERY_KEYS.rooms.yours, userId],
	});

	return { isLoading, rooms: data ?? [] };
};

