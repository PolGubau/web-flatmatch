import type { RoomWithMetadata } from "~/entities/room/room";
import { supabase } from "~/global/supabase/client";
import type { Filters } from "../../ui/feed/filters/filters-form";
import { buildRoomSelect } from "./get-single-room";

type GetRoomsWithMetadataProps = {
	userId?: string;
	createdBy?: string;
	notCreatedBy?: string;
	filters?: Filters;
	page?: number;
};

/**
 * Obtiene las rooms con filtros y joins de metadata (owner, interaction, verified)
 * @param userId ID del usuario actual para filtrar sus interacciones
 * @param createdBy Filtrar rooms creadas por este usuario
 * @param notCreatedBy Excluir rooms creadas por este usuario
 * @param filters Filtros opcionales (location, minPrice, maxPrice)
 * @param page Número de página (paginación de 10 en 10)
 */
export const getRoomsWithMetadata = async (
	props: GetRoomsWithMetadataProps,
): Promise<RoomWithMetadata[]> => {
	const { userId, createdBy, notCreatedBy, filters, page = 0 } = props;

	// Base query
	let query = supabase
		.from("rooms")
		.select(buildRoomSelect(userId))
		.eq("status", "available")
		.range(page * 10, page * 10 + 9)
		.order("created_at", { ascending: false });

	// Filtros dinámicos
	if (filters?.location)
		query = query.ilike("location", `%${filters.location}%`);
	if (filters?.minPrice) query = query.gte("price->amount", filters.minPrice);
	if (filters?.maxPrice) query = query.lte("price->amount", filters.maxPrice);
	if (filters?.afterDate) {
		const afterDate = new Date(filters.afterDate).toISOString();
		query = query.gte("timings->>available_from", afterDate);
	}
	if (filters?.rentType) query = query.eq("rent_type", filters.rentType);
	if (createdBy) query = query.eq("owner_id", createdBy);
	if (notCreatedBy) query = query.neq("owner_id", notCreatedBy);

	const { data, error } = await query;

	if (error) throw error;
	return data as unknown as RoomWithMetadata[];
};
