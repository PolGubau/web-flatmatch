import { useQuery } from "@tanstack/react-query";
import type { RoomWithMetadata } from "~/entities/room/room";
import { QUERY_KEYS } from "~/global/constants";
import { getFavoriteRoomsService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type GetRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithMetadata[];
	error: Error | null;
};
type GetRoom = () => GetRoomResponse;

export const getFavRoomsQuery: GetRoom = () => {
	const { data, isLoading, error } = useQuery<RoomWithMetadata[]>({
		queryFn: async () => {
			console.log("🔄 Fetching favorite rooms...");
			const result = await getFavoriteRoomsService();
			console.log("✅ Favorite rooms fetched:", result);
			return result;
		},
		queryKey: QUERY_KEYS.rooms.favorites,
	});
	const rooms = data ?? [];

	if (error) {
		console.error("❌ Error fetching favorite rooms:", error);
	}

	return { error: error as Error | null, isLoading, rooms };
};
