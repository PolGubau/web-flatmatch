import type { User } from "./user";

export type EditableUser = Omit<User, "id" | "createdAt" | "updatedAt">;
