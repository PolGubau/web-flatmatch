/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type { EditableRoom } from "~/entities/room/editable-room";
import type {
	RoomCommodities,
	RoomContact,
	RoomEditableImages,
	RoomLocation,
	RoomPreferences,
	RoomPrice,
	RoomRules,
	RoomStatus,
	RoomTimings,
	RoomWhoIsLiving,
} from "~/entities/room/editable-room.schema";
import type {
	Interaction,
	Owner,
	Room,
	RoomWithMetadata,
	Verification,
} from "~/entities/room/room";
import type { RentType } from "~/shared/types/common";
import type { RoomWithMetadataDB } from "../../types/dtos";
import type { RoomDB } from "../room-api";
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
				cover: room.images.cover,
				gallery: room.images.gallery.map(
					(img) => (typeof img === "string" ? img : ""), // ⚠️ los File se deberían subir antes a Storage
				),
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
			images: dto.images as unknown as RoomEditableImages,

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
export const roomBDtoDomainAndMetadata = (
	row: RoomWithMetadataDB,
): RoomWithMetadata => {
	const interactionDto = row.interaction as any;
	const verificationDto = row.verified as any;
	const ownerDto = row.owner as any;

	// Manejar interaction que puede venir como objeto o undefined
	const interaction: Interaction = {
		action: interactionDto?.action ?? null,
		lastActionAt: interactionDto?.last_action_at ?? null,
	};

	// Manejar verification que puede venir como objeto o undefined
	const verification: Verification = {
		notes: verificationDto?.notes ?? null,
		verificationType: verificationDto?.verification_type ?? null,
		verifiedAt: verificationDto?.verified_at ?? null,
		verifiedBy: verificationDto?.verified_by ?? null,
	};

	// Manejar owner que puede venir como objeto o undefined
	const owner = {
		avatar: ownerDto?.avatar ?? null,
		id: ownerDto?.id ?? row.owner_id ?? "",
		name: ownerDto?.name ?? "Unknown",
	};

	const baseRoom: RoomDB = {
		commodities: row.commodities,
		contact: row.contact,
		created_at: row.created_at ?? new Date().toISOString(),
		description: row.description ?? "",
		id: row.id ?? "ADAPTER DID NOT FIND ID",
		images: row.images,
		location: row.location,
		owner_id: row.owner_id ?? "",
		preferences: row.preferences,
		price: row.price,
		rent_type: row.rent_type ?? "private-room",
		rules: row.rules,
		status: row.status ?? "available",
		timings: row.timings,
		title: row.title ?? "ADAPTER DID NOT FOUND TITLE",
		updated_at: row.updated_at ?? new Date().toISOString(),
		who_is_living: row.who_is_living,
	};

	return {
		...roomMapper.toDomain(baseRoom),
		interaction,
		owner,
		verification,
	};
};

export const roomToEditableRoom = (room: Room): EditableRoom => {
	const { images, ...editableRoom } = room;

	const coverIndex = images.gallery.findIndex((img) => img === images.cover);
	const editableImages: EditableRoom["images"] = {
		coverIndex,
		gallery: images.gallery,
	};
	return {
		...editableRoom,
		images: editableImages,
	};
};
