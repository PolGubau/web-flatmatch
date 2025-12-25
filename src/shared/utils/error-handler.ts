import { toast } from "~/shared/components/ui/sonner";
import { logger } from "./logger";

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
	constructor(
		message: string,
		public code?: string,
		public statusCode?: number,
	) {
		super(message);
		this.name = "AppError";
	}
}

/**
 * Error handler utility for consistent error management
 */
export const errorHandler = {
	/**
	 * Extract error message from unknown error type
	 */
	getErrorMessage: (error: unknown): string => {
		if (error instanceof Error) return error.message;
		if (typeof error === "string") return error;
		return "An unexpected error occurred";
	},
	/**
	 * Handle API errors and show appropriate user feedback
	 */
	handleApiError: (error: unknown, fallbackMessage = "An error occurred") => {
		logger.error("API Error", error);

		if (error instanceof AppError) {
			toast.error(error.message);
			return error;
		}

		if (error instanceof Error) {
			toast.error(error.message || fallbackMessage);
			return new AppError(error.message, "UNKNOWN_ERROR");
		}

		toast.error(fallbackMessage);
		return new AppError(fallbackMessage, "UNKNOWN_ERROR");
	},

	/**
	 * Check if error is a specific type
	 */
	isAppError: (error: unknown): error is AppError => {
		return error instanceof AppError;
	},

	/**
	 * Log error without showing UI feedback
	 */
	logError: (error: unknown, context?: string) => {
		logger.error(context || "Error", error);
	},
};
