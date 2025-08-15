import type { EditableRoom } from "~/entities/room/editable-room";
import type { Room } from "~/entities/room/room";
import { RoomRepository } from "../../infra/room-repository";
import { roomAdapter } from "../adapter/room-adapter";

export const getRoomService = async (id: string): Promise<Room | null> => {
	// 1. Error handling
	if (!id) throw new Error("Room ID is required");
	// 2. get the data
	const dto = await RoomRepository.findById(id);
	// 3. adapt the data
	const domain = dto ? roomAdapter.mapDtoToRoom(dto) : null;

	return domain;
};

export const updateRoomService = async (
	roomId: string,
	room: Partial<EditableRoom>,
): Promise<Room | null> => {
	const dto = await RoomRepository.update(roomId, room);

	const domain = dto ? roomAdapter.mapDtoToRoom(dto) : null;

	return domain;
};

export const deleteRoomService = async (id: string): Promise<void> => {
	if (!id) throw new Error("Room ID is required");
	await RoomRepository.delete(id);
};

export const listAllRoomsService = async (): Promise<Room[]> => {
	const dtoList = await RoomRepository.findAll();
	return dtoList.map(roomAdapter.mapDtoToRoom);
};
export const listMultipleRoomsService = async (ids: string[]): Promise<Room[]> => {
	const dtoList = await RoomRepository.findMany(ids);
	return dtoList.map(roomAdapter.mapDtoToRoom);
};
