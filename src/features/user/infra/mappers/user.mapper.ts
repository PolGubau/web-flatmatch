import type { Gender, Occupation, Preferences, User } from "~/entities/user/user";
import type { UserDB } from "../api";

/**
 * Convierte fila de DB a DTO
 */
export const dtoToDomain = (u: UserDB): User => ({
	aboutMe: u.about_me ?? undefined,
	authProvider: u.auth_provider ?? undefined,
	avatarUrl: u.avatar_url ?? undefined,
	birthDate: u.birth_date ?? null,
	createdAt: u.created_at ? new Date(u.created_at) : new Date(),
	email: u.email,
	gender: (u.gender as Gender) ?? "unknown",
	id: u.id,
	languagesSpoken: u.languages_spoken ?? undefined,
	lastname: u.lastname,
	name: u.name,
	occupation: (u.occupation as Occupation) ?? null,
	phone: u.phone ?? undefined,
	preferences: (u.preferences as Preferences) ?? {
		age: { max: 99, min: 18 },
		gender: { female: true, male: true, other: true },
		maxBudget: 0,
		occupation: { employed: true, other: true, student: true, unemployed: true },
		rentType: ["shared", "room", "entire"],
	},
	providerId: u.provider_id ?? undefined,
	updatedAt: u.updated_at ? new Date(u.updated_at) : new Date(),
});

/**
 * Convierte DTO a payload de insert/update en DB
 */
export const domainToDb = (dto: Partial<User>): Partial<UserDB> => ({
	about_me: dto.aboutMe ?? null,
	auth_provider: dto.authProvider ?? null,
	avatar_url: dto.avatarUrl ?? null,
	birth_date: dto.birthDate ?? null, // YYYY-MM-DD
	email: dto.email,
	gender: dto.gender,
	languages_spoken: dto.languagesSpoken ?? null,
	lastname: dto.lastname,
	name: dto.name,
	occupation: dto.occupation,
	phone: dto.phone ?? null,
	preferences: dto.preferences ?? null,
	provider_id: dto.providerId ?? null,
});

export const userMapper = {
	toDb: domainToDb,
	toDomain: dtoToDomain,
};
