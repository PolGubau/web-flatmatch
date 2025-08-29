import type { EditableRoom } from "~/entities/room/editable-room";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { supabase } from "~/global/supabase/client";
import type { Inserts, Tables, Updates, Views } from "~/global/supabase/types-helpers";
import type { Create, Delete, FindAll, FindById, FindMany, Update } from "~/shared/abstracts/repo";
import { roomBDtoDomainAndMetadata } from "./adapter/room.adapter";

export type RoomDB = Tables<"rooms">;
export type RoomWithVerificationDB = Views<"rooms_with_verification">;
export type RoomWithMetadataDB = RoomWithVerificationDB & {
	savedIds: { room_id: string }[];
};
export type InsertRoom = Inserts<"rooms">;
export type UpdateRoom = Updates<"rooms">;

/**
 * Devuelve todas las rooms con su verificación
 */

export const getAllRooms: FindAll<RoomWithMetadata> = async () => {
	const userId = await getUserId();
	const { data, error } = await supabase.from("rooms_with_verification").select(`
		*,
		savedIds:user_saved_rooms (
			room_id
		)
	`);

	console.log(data);
	if (error) throw error;

	const roomWithMetadata = data.map((room) => roomBDtoDomainAndMetadata(room, userId));

	return roomWithMetadata;
};

/**
 * Devuelve una room por id con verificación
 */
export const getOneRoom: FindById<RoomWithMetadata> = async (id) => {
	const userId = await getUserId();

	const { data, error } = await supabase
		.from("rooms_with_verification")
		.select(`
			*,
			savedIds:user_saved_rooms (
				room_id
			)
		`)
		.eq("id", id)
		.single();

	if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
	if (!data) {
		return null;
	}
	return roomBDtoDomainAndMetadata(data, userId);
};

/**
 * Devuelve varias rooms por id con verificación
 */
export const getManyRooms: FindMany<RoomWithMetadata> = async (ids) => {
	const userId = await getUserId();

	const { data, error } = await supabase
		.from("rooms_with_verification")
		.select(`
		*,
		savedIds:user_saved_rooms (
			room_id
		)
	`)
		.in("id", ids);

	if (error) throw error;
	return data.map((room) => roomBDtoDomainAndMetadata(room, userId));
};

/**
 * Crea una nueva room (sin verificación, solo en `rooms`)
 */
export const createRoom: Create<RoomWithMetadata, EditableRoom> = async (editableRoom) => {
	// 1. obtener user loggeado

	const userId = await getUserId();

	const allImages = editableRoom.images.gallery;
	const existingUrls = allImages.filter((img) => typeof img === "string");
	const imagesToUpload = allImages.filter((img) => typeof img !== "string");

	const newUrls = await uploadImages(userId, imagesToUpload as File[]);

	const allUrls = [...existingUrls, ...newUrls];

	const payload: InsertRoom = {
		description: editableRoom.description,
		images: allUrls,
		location: editableRoom.location,
		owner_id: userId,
		preferences: editableRoom.preferences,
		price: editableRoom.price,
		title: editableRoom.title,
	};

	const { data: created, error } = await supabase.from("rooms").insert(payload).select().single();

	if (error) throw error;

	// devolver con verificación incluida
	const { data: withVerification } = await supabase
		.from("rooms_with_verification")
		.select(`
			*,
			savedIds:user_saved_rooms (
				room_id
			)
		`)
		.eq("id", created.id)
		.single();

	if (!withVerification) {
		throw new Error("Room created but then verification not found");
	}

	return roomBDtoDomainAndMetadata(withVerification, userId);
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
export const updateRoom: Update<RoomWithMetadata, EditableRoom> = async (id, data) => {
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
	if (!updated) return null;

	// devolver con verificación incluida
	const { data: withVerification } = await supabase
		.from("rooms_with_verification")
		.select(`
			*,
			savedIds:user_saved_rooms (
				room_id
			)
		`)
		.eq("id", updated.id)
		.single();

	if (!withVerification) {
		throw new Error("Room created but then verification not found");
	}

	return roomBDtoDomainAndMetadata(withVerification, userId);
};

/**
 * Sube imágenes a Supabase Storage y devuelve sus URLs públicas
 */
async function uploadImages(userId: string, images: File[]): Promise<string[]> {
	const urls: string[] = [];

	for (const img of images) {
		const fileName = `${userId}/${Date.now()}-${img.name}`;
		const { error } = await supabase.storage.from("room-images").upload(fileName, img);

		if (error) throw error;

		const { data: publicUrl } = supabase.storage.from("room-images").getPublicUrl(fileName);

		urls.push(publicUrl.publicUrl);
	}

	return urls;
}

async function uploadNewImages(userId: string, images: (string | File)[]): Promise<string[]> {
	const existingUrls = images.filter((img) => typeof img === "string") as string[];
	const imagesToUpload = images.filter((img) => typeof img !== "string") as File[];

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

	const { data, error } = await supabase
		.from("rooms_with_verification")
		.select(`
			*,
			savedIds:user_saved_rooms (
				room_id
			)
		`)
		.eq("owner_id", userId)
		.eq("is_favorite", true);

	if (error) throw error;

	return data.map((room) => roomBDtoDomainAndMetadata(room, userId));
}

export async function addFavoriteRoom(id: Room["id"]): Promise<void> {
	// 1. favorite rooms is a table so we need to insert a row there
	const userId = await getUserId();

	const { error } = await supabase
		.from("user_saved_rooms")
		.insert({ room_id: id, user_id: userId });

	if (error) throw error;
}
export async function removeFavoriteRoom(id: Room["id"]): Promise<void> {
	const userId = await getUserId();

	const { error } = await supabase
		.from("user_saved_rooms")
		.delete()
		.eq("room_id", id)
		.eq("user_id", userId);

	if (error) throw error;
}
