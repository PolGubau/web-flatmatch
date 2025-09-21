import type { EditableRoom } from "~/entities/room/editable-room";
import type { Interaction, Room, RoomWithMetadata } from "~/entities/room/room";
import type { AbstractRepository } from "~/shared/abstracts/repo";
import type { RoomAction } from "../types/common";
import {
	createRoom,
	deleteRoom,
	getAllRooms,
	getFavoriteRooms,
	getManyRooms,
	getOneRoom,
	interactRoom,
	removeInteraction,
	updateRoom,
} from "./room-api";

export type InteractApiResponse = Interaction & {
	roomId: string;
};
export type InteractApi = (
	id: string,
	action: RoomAction,
) => Promise<InteractApiResponse>;

export type RemoveInteractionApiResponse = {
	roomId: string;
	success: boolean;
};
export type RemoveInteractionApi = (
	id: Room["id"],
) => Promise<RemoveInteractionApiResponse>;

type RoomRepository = AbstractRepository<RoomWithMetadata, EditableRoom> & {
	findFavorites: () => Promise<RoomWithMetadata[]>;
	interact: InteractApi;
	removeInteraction: RemoveInteractionApi;
};
export const RoomRepository: RoomRepository = {
	create: (data) => createRoom(data),
	delete: (id) => deleteRoom(id),
	findAll: () => getAllRooms(),
	findById: (id) => getOneRoom(id),
	findFavorites: () => getFavoriteRooms(),
	findMany: (ids) => getManyRooms(ids),
	interact: (id, action) => interactRoom(id, action),
	removeInteraction: (id) => removeInteraction(id),
	update: (id, data) => updateRoom(id, data),
};
