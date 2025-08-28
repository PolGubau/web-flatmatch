import { useQuery } from "@tanstack/react-query";
import type { Room, RoomWithVerification } from "~/entities/room/room";
import { listAllRoomsService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type ListRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithVerification[];
};

type ListRoomQuery = () => ListRoomResponse;

export const listRoomsQuery: ListRoomQuery = () => {
	const { data, isLoading } = useQuery<RoomWithVerification[]>({
		queryFn: listAllRoomsService,
		queryKey: ["rooms"],
	});

	return { isLoading, rooms: data ?? [] };
};
