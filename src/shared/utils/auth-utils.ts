import { supabase } from "~/global/supabase/client";
import { AppError } from "./error-handler";

/**
 * Auth utilities for common authentication operations
 */
export const authUtils = {
	/**
	 * Get the current authenticated user or null
	 */
	getCurrentUser: async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return user;
	},
	/**
	 * Get the current authenticated user ID
	 * @throws {AppError} If no user is authenticated
	 */
	getUserId: async (): Promise<string> => {
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user) {
			throw new AppError("No authenticated user found", "AUTH_REQUIRED", 401);
		}
		return user.id;
	},

	/**
	 * Check if user is authenticated
	 */
	isAuthenticated: async (): Promise<boolean> => {
		const user = await authUtils.getCurrentUser();
		return !!user;
	},
};
