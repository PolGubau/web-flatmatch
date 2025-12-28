import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { useDeleteRoomMutation } from "./mutations/delete-room.mutation";
import { useUpdateRoomMutation } from "./mutations/update-room.mutation";
import { getRoomQuery } from "./queries/get-room.query";

type UseRoomResponse = {
	isLoading: boolean;
	room: RoomWithMetadata | null;
	deleteRoom: (id: string) => void;
	updateRoom: (room: Room) => void;
	refetch: () => void;
};

/**
 * Hook orquestador que expone todo lo necesario para gestionar una Room
 * desde la UI (lectura, actualización, borrado...).
 */
export const useRoom = (id: string): UseRoomResponse => {
	const { room, isLoading, refetch } = getRoomQuery(id);
	const { mutate: updateRoom } = useUpdateRoomMutation();
	const { mutate: deleteRoom } = useDeleteRoomMutation();
	return { deleteRoom, isLoading, refetch, room, updateRoom };
};
