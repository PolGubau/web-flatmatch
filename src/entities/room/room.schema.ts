import { z } from "zod";
import { EditableRoomSchema } from "./editable-room.schema";

export const RoomSchema = EditableRoomSchema.extend({
	createdAt: z.coerce.date(),
	id: z.string(),
	images: z.object({
		gallery: z.array(z.url()),
		main: z.number(), // Index of the main image in the gallery
	}),
	updatedAt: z.coerce.date(),
});
