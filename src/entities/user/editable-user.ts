import type { UserDto } from "~/features/user/infra/dto/user.dto";

export type EditableUser = Omit<UserDto, "id" | "createdAt" | "updatedAt">;
