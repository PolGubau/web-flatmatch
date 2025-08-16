import type z from "zod";
import type { EditableRoomSchema } from "./editable-room.schema";

export type EditableRoom = z.infer<typeof EditableRoomSchema>;
