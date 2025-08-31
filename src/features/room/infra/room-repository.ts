import type { EditableRoom } from "~/entities/room/editable-room";
import type { Interaction, RoomWithMetadata } from "~/entities/room/room";
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

export type LikeApiResponse = Interaction & {
	roomId: string;
};
export type LikeApi = (id: string) => Promise<LikeApiResponse>;

export type RemoveLikeApiResponse = {
	roomId: string;
	success: boolean;
};
export type RemoveLikeApi = (id: string) => Promise<RemoveLikeApiResponse>;

type RoomRepository = AbstractRepository<RoomWithMetadata, EditableRoom> & {
	findFavorites: () => Promise<RoomWithMetadata[]>;
	like: LikeApi;
	removeLike: RemoveLikeApi;
};
export const RoomRepository: RoomRepository = {
	create: (data) => createRoom(data),
	delete: (id) => deleteRoom(id),
	findAll: () => getAllRooms(),
	findById: (id) => getOneRoom(id),
	findFavorites: () => getFavoriteRooms(),
	findMany: (ids) => getManyRooms(ids),
	like: (id) => addFavoriteRoom(id),
	removeLike: (id) => removeFavoriteRoom(id),
	update: (id, data) => updateRoom(id, data),
};
