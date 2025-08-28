import type { EditableRoom } from "~/entities/room/editable-room";
import type { RoomWithVerification } from "~/entities/room/room";
import type { AbstractRepository } from "~/shared/abstracts/repo";
import {
	createRoom,
	deleteRoom,
	getAllRooms,
	getManyRooms,
	getOneRoom,
	updateRoom,
} from "./room-api";

type RoomRepository = AbstractRepository<RoomWithVerification, EditableRoom>;
export const RoomRepository: RoomRepository = {
	create: (data) => createRoom(data),
	delete: (id) => deleteRoom(id),
	findAll: () => getAllRooms(),
	findById: (id) => getOneRoom(id),
	findMany: (ids) => getManyRooms(ids),
	update: (id, data) => updateRoom(id, data),
};
