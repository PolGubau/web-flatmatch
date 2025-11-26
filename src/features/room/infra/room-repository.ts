import type { EditableRoom } from "~/entities/room/editable-room";
import type { Interaction, Room, RoomWithMetadata } from "~/entities/room/room";
import type { AbstractRepository } from "~/shared/abstracts/repo";
import type { RoomAction } from "../types/common";
import {
	createRoom,
	deleteRoom,
	getFavoriteRooms,
	getFeed,
	getManyRooms,
	getOneRoom,
	getYourRooms,
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

export type GetFeedFilters = {
	location?: string;
	afterDate?: Date;
	minPrice?: number;
	maxPrice?: number;
};
type GetFeedProps = {
	filters?: GetFeedFilters;
	page?: number;
};
export type GetFeed = (props: GetFeedProps) => Promise<RoomWithMetadata[]>;

type RoomRepository = Omit<
	AbstractRepository<RoomWithMetadata, EditableRoom>,
	"create" | "findAll"
> & {
	findAll: GetFeed;
	create: (data: EditableRoom) => Promise<Room>;
	findFavorites: () => Promise<RoomWithMetadata[]>;
	interact: InteractApi;
	removeInteraction: RemoveInteractionApi;
	findYours: () => Promise<RoomWithMetadata[]>;
};
export const RoomRepository: RoomRepository = {
	create: (data) => createRoom(data),
	delete: (id) => deleteRoom(id),
	findAll: getFeed,
	findById: (id) => getOneRoom(id),
	findFavorites: () => getFavoriteRooms(),
	findMany: (ids) => getManyRooms(ids),
	findYours: () => getYourRooms(),
	interact: (id, action) => interactRoom(id, action),
	removeInteraction: (id) => removeInteraction(id),
	update: (id, data) => updateRoom(id, data),
};
