import type { Views } from "~/global/supabase/types-helpers";

export type RoomWithMetadataDB = Views<"rooms_with_metadata"> & {
	interaction: { action: string | null; last_action_at: string | null };
	verified: {
		verified_by: string | null;
		verification_type: string | null;
		verified_at: string | null;
		notes: string | null;
	};
	owner: { id: string; name: string; avatar: string | null };
};
