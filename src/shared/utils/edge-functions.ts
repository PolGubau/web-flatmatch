type EdgeFunction = "geocode";

export const supabaseFn = (fn: EdgeFunction, query: string) =>
	`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${fn}?${query}`;
