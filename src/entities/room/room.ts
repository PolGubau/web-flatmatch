import type z from "zod";
import type { CommoditiesSchema } from "./editable-room.schema";
import type { RoomSchema } from "./room.schema";

export type Room = z.infer<typeof RoomSchema>;
export type Commodities = z.infer<typeof CommoditiesSchema>;
