import type { EditableUser } from "~/entities/user/editable-user";
import type { User } from "~/entities/user/user";
import type { Create, Delete, FindAll, FindById, FindMany, Update } from "~/shared/abstracts/repo";
import { mockUsers } from "../__mock__/users";
import type { UserDto } from "./dto/user.dto";

export const getAllUsers: FindAll<UserDto> = async () => {
	await new Promise((r) => {
		setTimeout(() => r(mockUsers), 500);
	});

	return mockUsers;
};

export const getOneUser: FindById<UserDto> = async (id) => {
	const found = mockUsers.find((r) => r.id === id);
	return found ?? null;
};

export const getManyUsers: FindMany<UserDto> = async (ids) => {
	return mockUsers.filter((r) => ids.includes(r.id)) ?? [];
};

export const createUser: Create<UserDto, EditableUser> = async (editableUser) => {
	const newUser: User = {
		...editableUser,
		createdAt: new Date(),
		id: crypto.randomUUID(),
		updatedAt: new Date(),
	};
	mockUsers.push(newUser);
	return newUser;
};

export const deleteUser: Delete = async (id) => {
	const index = mockUsers.findIndex((r) => r.id === id);
	if (index !== -1) {
		mockUsers.splice(index, 1);
		return true;
	}
	return false;
};

export const updateUser: Update<UserDto, EditableUser> = async (id, data) => {
	// 1. get the User
	const User = mockUsers.find((r) => r.id === id);
	if (!User) return null;

	// 2. update the User
	const updatedUser: UserDto = {
		...User,
		...data,
	};
	mockUsers[mockUsers.indexOf(User)] = updatedUser;
	return updatedUser;
};
