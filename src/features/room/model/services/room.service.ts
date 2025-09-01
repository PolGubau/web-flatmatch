import type { EditableRoom } from "~/entities/room/editable-room";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import {
	type InteractApiResponse,
	type RemoveInteractionApiResponse,
	RoomRepository
} from "../../infra/room-repository";
import type { RoomAction } from "../../types/common";

export const getRoomService = async (id: string): Promise<RoomWithMetadata | null> => {
	// 1. Error handling
	if (!id) throw new Error("Room ID is required");
	// 2. get the data
	const roomWithVerification = await RoomRepository.findById(id);
	// 3. adapt the data
	const domain = roomWithVerification ?? null;

	return domain;
};
export const getFavoriteRoomsService = async (): Promise<RoomWithMetadata[]> => {
	// 2. get the data
	const favoriteRooms = await RoomRepository.findFavorites();
	// 3. adapt the data
	const domain = favoriteRooms ?? [];

	return domain;
};

export const updateRoomService = async (
	roomId: Room["id"],
	room: Partial<EditableRoom>,
): Promise<Room | null> => {
	const roomWithVerification = await RoomRepository.update(roomId, room);

	const domain = roomWithVerification ?? null;

	return domain;
};

export const deleteRoomService = async (id: Room["id"]): Promise<void> => {
	if (!id) throw new Error("Room ID is required");
	await RoomRepository.delete(id);
};

export const listAllRoomsService = async (): Promise<RoomWithMetadata[]> => {
	const dtoList = await RoomRepository.findAll();
	console.log("all rooms:", dtoList);
	return dtoList;
};
export const listMultipleRoomsService = async (ids: Room["id"][]): Promise<RoomWithMetadata[]> => {
	const dtoList = await RoomRepository.findMany(ids);
	return dtoList;
};

export const interactWithRoomService = async (
	roomId: Room["id"],
	action: RoomAction,
): Promise<InteractApiResponse> => {
	const response = await RoomRepository.interact(roomId, action);
	return response;
};
export const removeInteractionRoomService = async (
	roomId: Room["id"],
): Promise<RemoveInteractionApiResponse> => {
	const res = await RoomRepository.removeInteraction(roomId);
	return res;
};
