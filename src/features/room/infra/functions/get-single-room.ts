import type { RoomWithMetadata } from "~/entities/room/room";
import { supabase } from "~/global/supabase/client";

export const ROOM_QUERY_SELECT = `
        id,
        owner_id,
        title,
        description,
        rent_type,
        status,
        location,
        price,
        commodities,
        rules,
        timings,
        who_is_living,
        contact,
        created_at,
        updated_at,
        preferences,
        images,
        owner:users!rooms_owner_id_fkey (
          id,
          name,
          avatar_url
        ),
        interaction:room_user_interactions!left (
          action,
          last_action_at,
          user_id
        ),
        verified:room_verifications!left (
          id,
          verified_by,
          verification_type,
          date,
          notes
        )
      `;
type GetRoomWithMetadataProps = {
	id: string;
};

export const getRoomQuery = async (
	props: GetRoomWithMetadataProps,
): Promise<RoomWithMetadata> => {
	const { id } = props;
	// Base query
	const query = supabase
		.from("rooms")
		.select(ROOM_QUERY_SELECT)
		.eq("id", id)
		.single();

	const { data, error } = await query;
	if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
	console.log("data room with metadata:", data);
	if (error) throw error;
	return data;
};
