import type { Room } from "./room";

export type EditableRoom = Omit<Room, "id" | "createdAt" | "updatedAt"> & {
	createdAt?: Date;
	updatedAt?: Date;
	id?: string;
};
