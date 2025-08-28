import type { EditableRoom } from "~/entities/room/editable-room";
import type { Room, RoomWithVerification } from "~/entities/room/room";
import { RoomRepository } from "../../infra/room-repository";

export const getRoomService = async (id: string): Promise<RoomWithVerification | null> => {
	// 1. Error handling
	if (!id) throw new Error("Room ID is required");
	// 2. get the data
	const roomWithVerification = await RoomRepository.findById(id);
	// 3. adapt the data
	const domain = roomWithVerification ?? null;

	return domain;
};

export const updateRoomService = async (
	roomId: string,
	room: Partial<EditableRoom>,
): Promise<Room | null> => {
	const roomWithVerification = await RoomRepository.update(roomId, room);

	const domain = roomWithVerification ?? null;

	return domain;
};

export const deleteRoomService = async (id: string): Promise<void> => {
	if (!id) throw new Error("Room ID is required");
	await RoomRepository.delete(id);
};

export const listAllRoomsService = async (): Promise<RoomWithVerification[]> => {
	const dtoList = await RoomRepository.findAll();
	return dtoList;
};
export const listMultipleRoomsService = async (ids: string[]): Promise<RoomWithVerification[]> => {
	const dtoList = await RoomRepository.findMany(ids);
	return dtoList;
};
