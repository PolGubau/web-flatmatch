import { z } from "zod";

// Enum-like strings
export const GenderSchema = z.enum([
	"male",
	"female",
	"other",
	"prefer_not_to_say",
]);
export type Gender = z.infer<typeof GenderSchema>;

export const OccupationSchema = z.enum([
	"student",
	"employed",
	"unemployed",
	"other",
]);
export type Occupation = z.infer<typeof OccupationSchema>;

// Preferences
export const PreferencesSchema = z.object({
	age: z.object({
		max: z.number(),
		min: z.number(),
	}),
	duration: z
		.object({
			unit: z.enum(["month", "year"]),
			value: z.number(),
		})
		.optional(),
	gender: z.object({
		female: z.boolean(),
		male: z.boolean(),
		other: z.boolean(),
	}),
	maxBudget: z.number(),
	moveInDate: z.string().optional(), // YYYY-MM-DD
	occupation: z.object({
		employed: z.boolean(),
		other: z.boolean(),
		student: z.boolean(),
		unemployed: z.boolean(),
	}),
	rentType: z.array(z.enum(["shared", "room", "entire"])),
});
export type Preferences = z.infer<typeof PreferencesSchema>;

// User
export const UserSchema = z.object({
	aboutMe: z.string().max(200).optional(),

	authProvider: z.string().optional(),
	avatarUrl: z.url().optional(),

	birthDate: z.string().nullable(),

	createdAt: z.date(),
	email: z.email(),
	gender: GenderSchema.nullable(),
	id: z.string(),
	languagesSpoken: z.array(z.string()).optional(),
	lastname: z.string(),
	name: z.string(),
	occupation: OccupationSchema,
	phone: z.string().optional(),

	preferences: PreferencesSchema,
	providerId: z.string().optional(),
	updatedAt: z.date(),
});
export type User = z.infer<typeof UserSchema>;
