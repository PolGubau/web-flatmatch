import type {
	RentType,
	RoomCommodities,
	RoomContact,
	RoomImages,
	RoomLocation,
	RoomPreferences,
	RoomPrice,
	RoomRules,
	RoomStatus,
	RoomTimings,
	RoomWhoIsLiving,
} from "~/entities/room/editable-room.schema";
import type { Room, RoomWithVerification } from "~/entities/room/room";
import type { RoomDB, RoomWithVerificationDB } from "../room-api";
/**
 * Adaptador desde la view de Supabase
 */

/**
 * Maps a RoomDto (Supabase shape) to the domain Room
 */
export const roomMapper = {
	/**
	 * Maps a domain EditableRoom to a DTO payload (insert/update)
	 */
	toDb(room: Room): RoomDB {
		return {
			commodities: room.commodities,
			contact: room.contact,
			created_at: room.createdAt,
			description: room.description,
			id: room.id,

			images: {
				gallery: room.images.gallery.map(
					(img) => (typeof img === "string" ? img : ""), // ⚠️ los File se deberían subir antes a Storage
				),
				main: room.images.main,
			},
			location: room.location,
			owner_id: room.ownerId,
			preferences: room.preferences,
			price: room.price,
			rent_type: room.rentType,
			rules: room.rules,
			status: room.status,
			timings: room.timings,
			title: room.title,
			updated_at: room.updatedAt ?? room.createdAt,
			who_is_living: room.whoIsLiving,
		};
	},
	toDomain(dto: RoomDB): Room {
		return {
			commodities: dto.commodities as RoomCommodities,
			contact: dto.contact as RoomContact,
			createdAt: dto.created_at,
			description: dto.description ?? "",
			id: dto.id,
			//@ts-ignore
			images: dto.images as unknown as RoomImages,

			location: dto.location as RoomLocation,
			preferences: dto.preferences as RoomPreferences,
			price: dto.price as RoomPrice,
			rentType: dto.rent_type as RentType,
			rules: dto.rules as RoomRules,
			status: dto.status as RoomStatus,
			timings: dto.timings as unknown as RoomTimings,
			title: dto.title,
			updatedAt: dto.updated_at,
			whoIsLiving: dto.who_is_living as RoomWhoIsLiving,
		};
	},
};
export const roomBDtoDomainAndVerified = (row: RoomWithVerificationDB): RoomWithVerification => ({
	...roomMapper.toDomain(row as unknown as RoomDB),
	isVerified: !!row.verified_at,
});
