import { useQuery } from "@tanstack/react-query";
import type { RoomWithMetadata } from "~/entities/room/room";
import { getFavoriteRoomsService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type GetRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithMetadata[];
};
type GetRoom = () => GetRoomResponse;

export const getFavRoomsQuery: GetRoom = () => {
	const { data, isLoading } = useQuery<RoomWithMetadata[]>({
		queryFn: () => getFavoriteRoomsService(),
		queryKey: ["favoriteRooms"],
	});
	const rooms = data ?? [];

	return { isLoading, rooms };
};
