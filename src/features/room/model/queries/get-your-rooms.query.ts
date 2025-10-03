import { useQuery } from "@tanstack/react-query";
import type { RoomWithMetadata } from "~/entities/room/room";
import { listYourRoomsService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type YourRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithMetadata[];
};

type YourRoomQuery = () => YourRoomResponse;

export const listYourRoomsQuery: YourRoomQuery = () => {
	const { data, isLoading } = useQuery<RoomWithMetadata[]>({
		queryFn: () => listYourRoomsService(),
		queryKey: ["your-rooms"],
	});

	return { isLoading, rooms: data ?? [] };
};
