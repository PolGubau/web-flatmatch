import type { EditableRoom } from "~/entities/room/editable-room";
import type { AbstractRepository } from "~/shared/abstracts/repo";
import type { RoomDto } from "./dto/room.dto";
import {
	createRoom,
	deleteRoom,
	getAllRooms,
	getManyRooms,
	getOneRoom,
	updateRoom,
} from "./room-api";

type RoomRepository = AbstractRepository<RoomDto, EditableRoom>;
export const RoomRepository: RoomRepository = {
	create: (data) => createRoom(data),
	delete: (id) => deleteRoom(id),
	findAll: () => getAllRooms(),
	findById: (id) => getOneRoom(id),
	findMany: (ids) => getManyRooms(ids),
	update: (id, data) => updateRoom(id, data),
};
