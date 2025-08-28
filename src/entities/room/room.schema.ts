import { z } from "zod";
import { EditableRoomSchema } from "./editable-room.schema";

export const RoomSchema = EditableRoomSchema.extend({
	createdAt: z.string(),
	id: z.string(),
	images: z.object({
		gallery: z.array(z.url()),
		main: z.number(), // Index of the main image in the gallery
	}),
	ownerId: z.string(),
	updatedAt: z.string().nullable(),
});
