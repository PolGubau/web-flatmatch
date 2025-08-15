import type { EditableUser } from "~/entities/user/editable-user";
import type { AbstractRepository } from "~/shared/abstracts/repo";
import { createUser, deleteUser, getAllUsers, getManyUsers, getOneUser, updateUser } from "./api";
import type { UserDto } from "./dto/user.dto";

type UserRepository = AbstractRepository<UserDto, EditableUser>;
export const UserRepository: UserRepository = {
	create: (data) => createUser(data),
	delete: (id) => deleteUser(id),
	findAll: () => getAllUsers(),
	findById: (id) => getOneUser(id),
	findMany: (ids) => getManyUsers(ids),
	update: (id, data) => updateUser(id, data),
};
