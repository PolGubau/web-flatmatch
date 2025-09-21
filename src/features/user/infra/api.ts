import type { EditableUser } from "~/entities/user/editable-user";
import type { User } from "~/entities/user/user";
import { supabase } from "~/global/supabase/client";
import type { Tables } from "~/global/supabase/types";
import type { Inserts, Updates } from "~/global/supabase/types-helpers";
import type {
	Create,
	Delete,
	FindAll,
	FindById,
	FindMany,
	Update,
} from "~/shared/abstracts/repo";
import { userMapper } from "./mappers/user.mapper";

export type UserDB = Tables<"users">;
export type InsertUser = Inserts<"users">;
export type UpdateUser = Updates<"users">;

/**
 * Get all users
 */
export const getAllUsers: FindAll<User> = async (): Promise<User[]> => {
	const { data, error } = await supabase.from("users").select("*");
	if (error) throw error;
	return data.map(userMapper.toDomain);
};

/**
 * Get one user by id
 */
export const getOneUser: FindById<User> = async (id) => {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error) throw error;
	return data ? userMapper.toDomain(data) : null;
};

/**
 * Get many users by ids
 */
export const getManyUsers: FindMany<User> = async (ids): Promise<User[]> => {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.in("id", ids);
	if (error) throw error;
	return data.map(userMapper.toDomain) ?? [];
};

/**
 * Create a new user
 */
export const createUser: Create<User, EditableUser> = async (
	editableUser,
): Promise<User> => {
	const payload: InsertUser = {
		...editableUser,
	};
	const { data, error } = await supabase
		.from("users")
		.insert(payload)
		.select()
		.single();
	if (error) throw error;
	return userMapper.toDomain(data);
};

/**
 * Delete user by id
 */
export const deleteUser: Delete = async (id) => {
	const { error } = await supabase.from("users").delete().eq("id", id);
	if (error) throw error;
	return true;
};

/**
 * Update user
 */
export const updateUser: Update<User, Partial<EditableUser>> = async (
	id,
	data,
) => {
	// Primero trae el objeto actual
	const { data: existing, error: fetchError } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single();

	if (fetchError) throw fetchError;
	if (!existing) throw new Error("User not found");

	// Merge: datos existentes + cambios
	const payload = { ...existing, ...userMapper.toDb(data) };
	console.log("payload", payload);

	const { data: updated, error } = await supabase
		.from("users")
		.update(payload)
		.match({ id })
		.select()
		.single();

	if (error) throw error;

	return userMapper.toDomain(updated);
};
