import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "~/shared/components/ui/sonner";
import { AppError, errorHandler } from "./error-handler";
import { logger } from "./logger";

vi.mock("~/shared/components/ui/sonner", () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock("./logger", () => ({
	logger: {
		error: vi.fn(),
	},
}));

describe("errorHandler", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getErrorMessage", () => {
		it("should extract message from Error object", () => {
			const error = new Error("Test error message");
			expect(errorHandler.getErrorMessage(error)).toBe("Test error message");
		});

		it("should return string errors as-is", () => {
			expect(errorHandler.getErrorMessage("String error")).toBe("String error");
		});

		it("should return default message for unknown error types", () => {
			expect(errorHandler.getErrorMessage(null)).toBe(
				"An unexpected error occurred",
			);
			expect(errorHandler.getErrorMessage(undefined)).toBe(
				"An unexpected error occurred",
			);
			expect(errorHandler.getErrorMessage(123)).toBe(
				"An unexpected error occurred",
			);
			expect(errorHandler.getErrorMessage({})).toBe(
				"An unexpected error occurred",
			);
		});
	});

	describe("handleApiError", () => {
		it("should log error and show toast for Error objects", () => {
			const error = new Error("API failed");

			const result = errorHandler.handleApiError(error);

			expect(logger.error).toHaveBeenCalledWith("API Error", error);
			expect(toast.error).toHaveBeenCalledWith("API failed");
			expect(result).toBeInstanceOf(AppError);
			expect(result.message).toBe("API failed");
		});

		it("should handle AppError with custom message", () => {
			const error = new AppError("Custom app error", "CUSTOM_CODE", 400);

			const result = errorHandler.handleApiError(error);

			expect(logger.error).toHaveBeenCalledWith("API Error", error);
			expect(toast.error).toHaveBeenCalledWith("Custom app error");
			expect(result).toBe(error);
		});

		it("should use fallback message when error message is empty", () => {
			const error = new Error("");

			errorHandler.handleApiError(error, "Custom fallback");

			expect(toast.error).toHaveBeenCalledWith("Custom fallback");
		});

		it("should handle unknown error types with fallback", () => {
			const result = errorHandler.handleApiError(null, "Something went wrong");

			expect(toast.error).toHaveBeenCalledWith("Something went wrong");
			expect(result).toBeInstanceOf(AppError);
		});
	});

	describe("isAppError", () => {
		it("should return true for AppError instances", () => {
			const error = new AppError("Test", "CODE");
			expect(errorHandler.isAppError(error)).toBe(true);
		});

		it("should return false for regular Error objects", () => {
			const error = new Error("Test");
			expect(errorHandler.isAppError(error)).toBe(false);
		});

		it("should return false for non-error values", () => {
			expect(errorHandler.isAppError(null)).toBe(false);
			expect(errorHandler.isAppError(undefined)).toBe(false);
			expect(errorHandler.isAppError("error")).toBe(false);
			expect(errorHandler.isAppError(123)).toBe(false);
		});
	});

	describe("logError", () => {
		it("should log error without showing UI feedback", () => {
			const error = new Error("Silent error");

			errorHandler.logError(error, "Background process");

			expect(logger.error).toHaveBeenCalledWith("Background process", error);
			expect(toast.error).not.toHaveBeenCalled();
		});

		it("should use default context when not provided", () => {
			const error = new Error("Error");

			errorHandler.logError(error);

			expect(logger.error).toHaveBeenCalledWith("Error", error);
		});
	});

	describe("AppError", () => {
		it("should create error with message, code, and statusCode", () => {
			const error = new AppError("Not found", "NOT_FOUND", 404);

			expect(error.message).toBe("Not found");
			expect(error.code).toBe("NOT_FOUND");
			expect(error.statusCode).toBe(404);
			expect(error.name).toBe("AppError");
		});

		it("should create error with optional parameters", () => {
			const error = new AppError("Simple error");

			expect(error.message).toBe("Simple error");
			expect(error.code).toBeUndefined();
			expect(error.statusCode).toBeUndefined();
		});

		it("should be instanceof Error", () => {
			const error = new AppError("Test");

			expect(error).toBeInstanceOf(Error);
			expect(error).toBeInstanceOf(AppError);
		});
	});
});
