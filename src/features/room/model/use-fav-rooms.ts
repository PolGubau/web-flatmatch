import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { useUpdateRoomMutation } from "./mutations/update-room.mutation";
import { getFavRoomsQuery } from "./queries/get-fav-rooms.query";

type UseRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithMetadata[];
	updateRoom: (room: Room) => void;
	error: Error | null;
	refetch: () => void;
};

/**
 * Hook orquestador que expone todo lo necesario para gestionar una Room
 * desde la UI (lectura, actualización, borrado...).
 */
export const useFavRooms = (): UseRoomResponse => {
	const { rooms, isLoading, error, refetch } = getFavRoomsQuery();
	console.info("useFavRooms:", { error, isLoading, rooms });
	const { mutate: updateRoom } = useUpdateRoomMutation();
	return { error, isLoading, refetch, rooms, updateRoom };
};
