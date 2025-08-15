import { useQuery } from "@tanstack/react-query";
import type { Room } from "~/entities/room/room";
import { getRoomService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type GetRoomResponse = {
	isLoading: boolean;
	room: Room | null;
};
type GetRoom = (id: string) => GetRoomResponse;

export const getRoomQuery: GetRoom = (id) => {
	const { data, isLoading } = useQuery<Room | null>({
		enabled: !!id,
		queryFn: () => getRoomService(id),
		queryKey: ["room", id],
	});
	const room = data ?? null;

	return { isLoading, room };
};
