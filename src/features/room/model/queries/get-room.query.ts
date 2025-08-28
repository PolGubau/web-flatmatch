import { useQuery } from "@tanstack/react-query";
import type { RoomWithVerification } from "~/entities/room/room";
import { getRoomService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type GetRoomResponse = {
	isLoading: boolean;
	room: RoomWithVerification | null;
};
type GetRoom = (id: string) => GetRoomResponse;

export const getRoomQuery: GetRoom = (id) => {
	const { data, isLoading } = useQuery<RoomWithVerification | null>({
		enabled: !!id,
		queryFn: () => getRoomService(id),
		queryKey: ["room", id],
	});
	const room = data ?? null;

	return { isLoading, room };
};
