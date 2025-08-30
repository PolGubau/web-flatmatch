import type { Gender, Occupation, Preferences, User } from "~/entities/user/user";
import type { UserDB } from "../api";

type AbstractMapper<DB, Domain> = {
	toDb: (domain: Partial<Domain>) => Partial<DB>;
	toDomain: (db: DB) => Domain;
};

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
export const domainToDb = (dto: Partial<User>): Partial<UserDB> => {
	const payload: Partial<UserDB> = {};

	if ("aboutMe" in dto) payload.about_me = dto.aboutMe;
	if ("authProvider" in dto) payload.auth_provider = dto.authProvider;
	if ("avatarUrl" in dto) payload.avatar_url = dto.avatarUrl;
	if ("birthDate" in dto) payload.birth_date = dto.birthDate;
	if ("email" in dto) payload.email = dto.email;
	if ("gender" in dto) payload.gender = dto.gender;
	if ("languagesSpoken" in dto) payload.languages_spoken = dto.languagesSpoken;
	if ("lastname" in dto) payload.lastname = dto.lastname;
	if ("name" in dto) payload.name = dto.name;
	if ("occupation" in dto) payload.occupation = dto.occupation;
	if ("phone" in dto) payload.phone = dto.phone;
	if ("preferences" in dto) payload.preferences = dto.preferences;
	if ("providerId" in dto) payload.provider_id = dto.providerId;

	return payload;
};

export const userMapper: AbstractMapper<UserDB, User> = {
	toDb: domainToDb,
	toDomain: dtoToDomain,
};
