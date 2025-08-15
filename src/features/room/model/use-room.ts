import type { Room } from "~/entities/room/room";
import { useDeleteRoomMutation } from "./mutations/delete-room.mutation";
import { useUpdateRoomMutation } from "./mutations/update-room.mutation";
import { getRoomQuery } from "./queries/get-room.query";

type UseRoomResponse = {
	isLoading: boolean;
	room: Room | null;
	deleteRoom: (id: string) => void;
	updateRoom: (room: Room) => void;
};

/**
 * Hook orquestador que expone todo lo necesario para gestionar una Room
 * desde la UI (lectura, actualización, borrado...).
 */
export const useRoom = (id: string): UseRoomResponse => {
	const { room, isLoading } = getRoomQuery(id);
	const { mutate: updateRoom } = useUpdateRoomMutation();
	const { mutate: deleteRoom } = useDeleteRoomMutation();
	return { deleteRoom, isLoading, room, updateRoom };
};
