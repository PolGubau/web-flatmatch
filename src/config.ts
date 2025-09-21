const mustHaveEnv = [
	"VITE_SUPABASE_ANON_KEY",
	"VITE_SUPABASE_URL",
	"VITE_GOOGLE_ID",
];

for (const key of mustHaveEnv) {
	if (!import.meta.env[key]) {
		console.error(`${key} is required`);
		throw new Error(`${key} is required`);
	}
}

export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const GOOGLE_ID = import.meta.env.VITE_GOOGLE_ID;
