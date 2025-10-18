import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { useUpdateRoomMutation } from "./mutations/update-room.mutation";
import { getFavRoomsQuery } from "./queries/get-fav-rooms.query";

type UseRoomResponse = {
	isLoading: boolean;
	rooms: RoomWithMetadata[];
	updateRoom: (room: Room) => void;
};

/**
 * Hook orquestador que expone todo lo necesario para gestionar una Room
 * desde la UI (lectura, actualización, borrado...).
 */
export const useFavRooms = (): UseRoomResponse => {
	const { rooms, isLoading } = getFavRoomsQuery();
	console.info("useFavRooms:", { isLoading, rooms });
	const { mutate: updateRoom } = useUpdateRoomMutation();
	return { isLoading, rooms, updateRoom };
};
