import type z from "zod";
import type { CommoditiesSchema } from "./editable-room.schema";
import type { RoomSchema } from "./room.schema";
export type Interaction = {
	action: "like" | "dislike" | null;
	lastActionAt: string | null;
};
export type Verification = {
	verifiedAt: string | null;
	verifiedBy: string | null;
	verificationType: string | null;
	notes: string | null;
};
export type Room = z.infer<typeof RoomSchema>;
export type Commodities = z.infer<typeof CommoditiesSchema>;

export type RoomWithMetadata = Room & {
	verification: Verification;
	interaction: Interaction;
};
