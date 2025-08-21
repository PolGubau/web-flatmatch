import type { EditableRoom } from "~/entities/room/editable-room";
import type { Create, Delete, FindAll, FindById, FindMany, Update } from "~/shared/abstracts/repo";
import { mockRooms } from "../__mock__/rooms";
import type { RoomDto } from "./dto/room.dto";

export const getAllRooms: FindAll<RoomDto> = async () => {
	await new Promise((r) => {
		setTimeout(() => r(mockRooms), 500);
	});

	return mockRooms;
};

export const getOneRoom: FindById<RoomDto> = async (id) => {
	const found = mockRooms.find((r) => r.id === id);
	return found ?? null;
};

export const getManyRooms: FindMany<RoomDto> = async (ids) => {
	return mockRooms.filter((r) => ids.includes(r.id)) ?? [];
};

export const createRoom: Create<RoomDto, EditableRoom> = async (editableRoom) => {
	const roomsSrc = editableRoom.images.gallery.map((image) => {
		return typeof image === "string" ? image : URL.createObjectURL(image);
	});

	const newRoom: RoomDto = {
		...editableRoom,
		createdAt: new Date(),
		id: crypto.randomUUID(),
		images: {
			...editableRoom.images,
			gallery: roomsSrc,
		},
		updatedAt: new Date(),
	};

	mockRooms.push(newRoom);
	return newRoom;
};

export const deleteRoom: Delete = async (id) => {
	const index = mockRooms.findIndex((r) => r.id === id);
	if (index !== -1) {
		mockRooms.splice(index, 1);
		return true;
	}
	return false;
};

export const updateRoom: Update<RoomDto, EditableRoom> = async (id, data) => {
	// 1. get the room
	const room = mockRooms.find((r) => r.id === id);
	if (!room) return null;

	// 2. update the room
	const updatedRoom: RoomDto = {
		...room,
		...data,
		images: {
			...room.images,
		},
	};
	mockRooms[mockRooms.indexOf(room)] = updatedRoom;
	return updatedRoom;
};
