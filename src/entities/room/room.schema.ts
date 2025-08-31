import { z } from "zod";
import { EditableRoomSchema } from "./editable-room.schema";

export const ImagesSchema = z.object({
	cover: z.string(),
	gallery: z.array(z.url()),
});

export const RoomSchema = EditableRoomSchema.extend({
	createdAt: z.string(),
	id: z.string(),
	images: ImagesSchema,
	ownerId: z.string(),
	updatedAt: z.string().nullable(),
});
