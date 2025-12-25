export const constants = {
	description: "Find your perfect flatmate with Flatmatch",
	name: "Flatmatch",
	ogImage: "https://flatmatch.app/og-image.png",
	url: "https://flatmatch.app",
} as const;

/**
 * Query configuration constants for React Query
 */
export const QUERY_KEYS = {
	auth: {
		session: ["auth", "session"] as const,
	},
	chat: {
		conversation: (id: string) => ["conversation", id] as const,
		conversations: ["conversations"] as const,
		messages: (conversationId: string) => ["messages", conversationId] as const,
	},
	rooms: {
		all: ["rooms"] as const,
		detail: (id: string) => ["room", id] as const,
		favorites: ["favoriteRooms"] as const,
		list: (filters: Record<string, unknown>) => ["rooms", filters] as const,
		multiple: (ids: string[]) => ["rooms", ids] as const,
		yours: ["your-rooms"] as const,
	},
	users: {
		detail: (id: string) => ["user", id] as const,
		profile: ["profile"] as const,
	},
} as const;

/**
 * Cache and stale time configurations (in milliseconds)
 */
export const CACHE_CONFIG = {
	// Long cache for rarely changing data
	long: 1000 * 60 * 30, // 30 minutes
	// Medium cache for moderately changing data
	medium: 1000 * 60 * 5, // 5 minutes
	// Short cache for frequently changing data
	short: 1000 * 60, // 1 minute
} as const;

/**
 * Pagination configuration
 */
export const PAGINATION = {
	defaultPage: 0,
	pageSize: 10,
} as const;
