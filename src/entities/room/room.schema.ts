import { z } from "zod";
import { EditableRoomSchema } from "./editable-room.schema";

export const RoomSchema = EditableRoomSchema.extend({
	createdAt: z.coerce.date(),
	id: z.string(),
	updatedAt: z.coerce.date(),
});
