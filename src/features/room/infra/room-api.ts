import type { EditableRoom } from "~/entities/room/editable-room";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { supabase } from "~/global/supabase/client";
import type { Inserts, Tables, Updates } from "~/global/supabase/types-helpers";
import type {
	Create,
	Delete,
	FindAll,
	FindById,
	FindMany,
	Update,
} from "~/shared/abstracts/repo";
import type { RoomWithMetadataDB } from "../types/dtos";
import { roomBDtoDomainAndMetadata, roomMapper } from "./adapter/room.adapter";
import type { InteractApi, RemoveInteractionApi } from "./room-repository";

export type RoomDB = Tables<"rooms">;

export type InsertRoom = Inserts<"rooms">;
export type UpdateRoom = Updates<"rooms">;

/**
 * Devuelve todas las rooms con su verificación
 */

export const getFeed: FindAll<RoomWithMetadata> = async () => {
	const userId = await getUserId();

	const { data, error } = await supabase
		.rpc("rooms_with_metadata", {
			p_user_id: userId,
		})
		// .or("interaction_action.is.null,interaction_action.neq.like")
		.neq("owner_id", userId)
		.eq("status", "available")

		.limit(10);

	if (error) throw error;
	console.log("feed rooms:", data);
	if (!data) return [];

	const roomWithMetadata = data.map(roomBDtoDomainAndMetadata);
	return roomWithMetadata;
};
export const getYourRooms: FindAll<RoomWithMetadata> = async () => {
	const userId = await getUserId();

	const { data, error } = await supabase
		.from("rooms_with_metadata")
		.select("*")
		.eq("owner_id", userId)
		.limit(10);

	if (error) throw error;

	const roomWithMetadata = data.map(roomBDtoDomainAndMetadata);
	return roomWithMetadata;
};

/**
 * Devuelve una room por id con verificación
 */
export const getOneRoom: FindById<RoomWithMetadata> = async (id) => {
	// const _userId = await getUserId();

	const { data, error } = await supabase
		.from("rooms_with_metadata")
		.select("*")
		// .eq("room_user_interactions.user_id", userId)
		.eq("id", id)
		.single();

	if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
	if (!data) {
		return null;
	}

	return roomBDtoDomainAndMetadata(data);
};

/**
 * Devuelve varias rooms por id con verificación
 */
export const getManyRooms: FindMany<RoomWithMetadata> = async (ids) => {
	const userId = await getUserId();

	const { data, error } = await supabase
		.from("rooms_with_metadata")
		.select("*")
		.eq("room_user_interactions.user_id", userId)
		.in("id", ids);

	if (error) throw error;
	return data.map((room) => roomBDtoDomainAndMetadata(room));
};

/**
 * Crea una nueva room (sin verificación, solo en `rooms`)
 */
export const createRoom: Create<Room, EditableRoom> = async (editableRoom) => {
	const userId = await getUserId();

	const allImages = editableRoom.images.gallery;
	const existingUrls = allImages.filter((img) => typeof img === "string");
	const imagesToUpload = allImages.filter((img) => typeof img !== "string");

	const newUrls = await uploadImages(userId, imagesToUpload as File[]);

	const allUrls = [...existingUrls, ...newUrls];

	const images: Room["images"] = {
		cover:
			editableRoom.images.coverIndex !== undefined
				? allUrls[editableRoom.images.coverIndex]
				: "",
		gallery: allUrls,
	};

	const payload: InsertRoom = {
		commodities: editableRoom.commodities,
		contact: editableRoom.contact,
		description: editableRoom.description,
		images: images,
		location: editableRoom.location,
		owner_id: userId,
		preferences: editableRoom.preferences,
		price: editableRoom.price,
		rent_type: editableRoom.rentType,
		rules: editableRoom.rules,
		timings: editableRoom.timings,
		title: editableRoom.title,
		updated_at: new Date().toISOString(),
		who_is_living: editableRoom.whoIsLiving,
	};
	const { data: created, error } = await supabase
		.from("rooms")
		.insert(payload)
		.select("*")
		.single();

	if (error) throw error;

	return roomMapper.toDomain(created);
};

/**
 * Elimina una room
 */
export const deleteRoom: Delete = async (id) => {
	const { error } = await supabase.from("rooms").delete().eq("id", id);
	if (error) throw error;
	return true;
};

/**
 * Actualiza una room
 */
export const updateRoom: Update<RoomWithMetadata, EditableRoom> = async (
	id,
	data,
) => {
	// 1. obtener user loggeado
	const userId = await getUserId();
	const newGallery = data.images?.gallery
		? await uploadNewImages(userId, data.images.gallery)
		: undefined;
	const images = { ...data.images, gallery: newGallery };

	const payload: UpdateRoom = {
		...(data.title && { title: data.title }),
		...(data.description && { description: data.description }),
		...(data.price && { price: data.price }),
		...(data.location && { location: data.location }),
		...(data.images && { images }),
		...(data.preferences && { preferences: data.preferences }),
	};

	const { data: updated, error } = await supabase
		.from("rooms")
		.update(payload)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	if (!updated) {
		throw new Error("Error when updating room");
	}

	// devolver con verificación incluida
	const { data: withVerification } = await supabase
		.from("rooms_with_metadata")
		.select("*")
		.eq("room_user_interactions.user_id", userId)
		.eq("id", updated.id)
		.single();

	if (!withVerification) {
		throw new Error("Room created but then verification not found");
	}

	return roomBDtoDomainAndMetadata(withVerification);
};

/**
 * Sube imágenes a Supabase Storage y devuelve sus URLs públicas
 */
async function uploadImages(userId: string, images: File[]): Promise<string[]> {
	const urls: string[] = [];

	for (const img of images) {
		const fileName = `${userId}/${Date.now()}-${img.name}`;
		const { error } = await supabase.storage
			.from("room-images")
			.upload(fileName, img);

		if (error) throw error;

		const { data: publicUrl } = supabase.storage
			.from("room-images")
			.getPublicUrl(fileName);

		urls.push(publicUrl.publicUrl);
	}

	return urls;
}

async function uploadNewImages(
	userId: string,
	images: (string | File)[],
): Promise<string[]> {
	const existingUrls = images.filter(
		(img) => typeof img === "string",
	) as string[];
	const imagesToUpload = images.filter(
		(img) => typeof img !== "string",
	) as File[];

	const newUrls = await uploadImages(userId, imagesToUpload);

	return [...existingUrls, ...newUrls];
}

async function getUserId(): Promise<string> {
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		throw new Error("No authenticated user found");
	}
	return user.id;
}

export async function getFavoriteRooms(): Promise<RoomWithMetadata[]> {
	const userId = await getUserId();

	// Primero obtener los IDs de las rooms que le gustan al usuario
	const { data: interactions, error: interactionsError } = await supabase
		.from("room_user_interactions")
		.select("room_id")
		.eq("user_id", userId)
		.eq("action", "like");

	if (interactionsError) throw interactionsError;
	if (!interactions || interactions.length === 0) return [];

	const roomIds = interactions.map((i) => i.room_id);

	// Luego obtener las rooms completas con metadata usando el RPC
	const { data, error } = await supabase
		.rpc("rooms_with_metadata", {
			p_user_id: userId,
		})
		.in("id", roomIds);

	if (error) throw error;
	if (!data) return [];

	// El RPC devuelve un tipo compatible con RoomWithMetadataDB
	const roomWithMetadata = data.map((room) =>
		roomBDtoDomainAndMetadata(room as unknown as RoomWithMetadataDB),
	);
	return roomWithMetadata;
}

export const interactRoom: InteractApi = async (id, action) => {
	const userId = await getUserId();

	const { error, data } = await supabase
		.from("room_user_interactions")
		.upsert(
			{
				action,
				last_action_at: new Date().toISOString(),
				room_id: id,
				user_id: userId,
			},
			{
				onConflict: "room_id,user_id", // Especifica las columnas únicas para el conflicto
			},
		)
		.select()
		.single();

	if (error) throw error;
	return {
		action: data.action,
		lastActionAt: data.last_action_at,
		roomId: id,
	};
};
export const removeInteraction: RemoveInteractionApi = async (id) => {
	const userId = await getUserId();

	const { error } = await supabase
		.from("room_user_interactions")
		.delete()
		.eq("room_id", id)
		.eq("user_id", userId);

	if (error) throw error;

	return {
		roomId: id,
		success: true,
	};
};
