import type { EditableUser } from "~/entities/user/editable-user";
import type { User } from "~/entities/user/user";
import type { AbstractRepository } from "~/shared/abstracts/repo";
import { createUser, deleteUser, getAllUsers, getManyUsers, getOneUser, updateUser } from "./api";

type UserRepository = AbstractRepository<User, EditableUser>;
export const UserRepository: UserRepository = {
	create: (data) => createUser(data),
	delete: (id) => deleteUser(id),
	findAll: () => getAllUsers(),
	findById: (id) => getOneUser(id),
	findMany: (ids) => getManyUsers(ids),
	update: (id, data) => updateUser(id, data),
};
