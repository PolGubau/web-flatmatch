import type { RoomWithMetadata } from "~/entities/room/room";
import { supabase } from "~/global/supabase/client";
import type { RoomWithMetadataDB } from "../../types/dtos";
import { roomBDtoDomainAndMetadata } from "../adapter/room.adapter";

type GetRoomWithMetadataProps = {
	id: string;
	userId?: string;
};

/**
 * Builds the SELECT string for room queries with metadata
 * @param userId Optional user ID to filter interactions
 * @returns PostgreSQL SELECT string
 */
export const buildRoomSelect = (userId?: string): string => {
	// Build the select with optional user_id filter
	const interactionSelect = userId
		? `interaction:room_user_interactions!left(action,last_action_at,user_id).eq(user_id,${userId})`
		: `interaction:room_user_interactions!left(action,last_action_at,user_id)`;

	return `
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
        ${interactionSelect},
        verified:room_verifications!left (
          id,
          verified_by,
          verification_type,
          date,
          notes
        )
      `;
};

export const getRoomQuery = async (
	props: GetRoomWithMetadataProps,
): Promise<RoomWithMetadata> => {
	const { id, userId } = props;

	// Base query
	const query = supabase
		.from("rooms")
		.select(buildRoomSelect(userId))
		.eq("id", id)
		.single();

	const { data, error } = await query;
	if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
	console.log("data room with metadata:", data);
	if (error) throw error;

	return roomBDtoDomainAndMetadata(data as unknown as RoomWithMetadataDB);
};
