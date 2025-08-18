export interface UserDto {
	id: string;
	name: string;
	lastname: string;
	email: string;
	phone?: string;
	avatarUrl?: string;

	birthDate: Date; // ISO (YYYY-MM-DD)
	gender: "male" | "female" | "other" | "prefer_not_to_say";
	occupation: "student" | "employed" | "unemployed" | "other";

	createdAt: Date;
	updatedAt: Date;

	aboutMe?: string; // breve bio para el perfil público
	languagesSpoken?: string[]; // ej: ['es', 'en', 'fr']
	isVerified: {
		email: boolean;
		phone: boolean;
		idCheck: boolean;
	};

	// Qué busca
	preferences: {
		gender: {
			male: boolean;
			female: boolean;
			other: boolean;
		};
		age: {
			min: number;
			max: number;
		};
		occupation: {
			student: boolean;
			employed: boolean;
			unemployed: boolean;
			other: boolean;
		};
		rentType: ("shared" | "room" | "entire")[];
		maxBudget: number;
		moveInDate?: string; // YYYY-MM-DD
		duration?: {
			unit: "month" | "year";
			value: number;
		};
	};

	// Relacional
	savedRoomIds?: string[];
	listedRoomIds?: string[];

	// Login info (si usas auth externa)
	authProvider?: "credentials" | "google" | "facebook";
	providerId?: string; // ID externo (si aplica)
}
