import type { EditableRoom } from "~/entities/room/editable-room";
import type { RoomWithMetadata } from "~/entities/room/room";
import type { AbstractRepository } from "~/shared/abstracts/repo";
import {
	addFavoriteRoom,
	createRoom,
	deleteRoom,
	getAllRooms,
	getFavoriteRooms,
	getManyRooms,
	getOneRoom,
	removeFavoriteRoom,
	updateRoom,
} from "./room-api";

type RoomRepository = AbstractRepository<RoomWithMetadata, EditableRoom> & {
	findFavorites: () => Promise<RoomWithMetadata[]>;
	addFavorite: (id: string) => Promise<void>;
	removeFavorite: (id: string) => Promise<void>;
};
export const RoomRepository: RoomRepository = {
	addFavorite: (id) => addFavoriteRoom(id),
	create: (data) => createRoom(data),
	delete: (id) => deleteRoom(id),
	findAll: () => getAllRooms(),
	findById: (id) => getOneRoom(id),
	findFavorites: () => getFavoriteRooms(),
	findMany: (ids) => getManyRooms(ids),
	removeFavorite: (id) => removeFavoriteRoom(id),
	update: (id, data) => updateRoom(id, data),
};
