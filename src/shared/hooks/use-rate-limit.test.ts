import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "~/shared/components/ui/sonner";
import { useRateLimit } from "./use-rate-limit";

vi.mock("~/shared/components/ui/sonner", () => ({
	toast: {
		error: vi.fn(),
	},
}));

describe("useRateLimit", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should allow calls within the limit", () => {
		const { result } = renderHook(() => useRateLimit(3, 1000));

		act(() => {
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(true);
		});

		expect(toast.error).not.toHaveBeenCalled();
	});

	it("should block calls exceeding the limit", () => {
		const { result } = renderHook(() => useRateLimit(2, 1000));

		act(() => {
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(false);
		});

		expect(toast.error).toHaveBeenCalledWith(
			"Too many requests. Please wait a moment.",
		);
	});

	it("should reset after time window expires", () => {
		const { result } = renderHook(() => useRateLimit(2, 1000));

		act(() => {
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(true);
		});

		// Advance time past the window
		act(() => {
			vi.advanceTimersByTime(1001);
		});

		act(() => {
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(true);
		});
	});

	it("should not show toast when showToast is false", () => {
		const { result } = renderHook(() => useRateLimit(1, 1000));

		act(() => {
			expect(result.current()).toBe(true);
			expect(result.current(false)).toBe(false);
		});

		expect(toast.error).not.toHaveBeenCalled();
	});

	it("should handle sliding window correctly", () => {
		const { result } = renderHook(() => useRateLimit(3, 1000));

		act(() => {
			expect(result.current()).toBe(true); // t=0
		});

		act(() => {
			vi.advanceTimersByTime(400);
		});

		act(() => {
			expect(result.current()).toBe(true); // t=400
		});

		act(() => {
			vi.advanceTimersByTime(400);
		});

		act(() => {
			expect(result.current()).toBe(true); // t=800
		});

		// At t=800, all 3 calls are still within the 1000ms window
		act(() => {
			expect(result.current()).toBe(false); // Should be blocked
		});

		// Advance to t=1001, first call should be expired
		act(() => {
			vi.advanceTimersByTime(201);
		});

		act(() => {
			expect(result.current()).toBe(true); // Should be allowed now
		});
	});

	it("should maintain separate state for different hook instances", () => {
		const { result: result1 } = renderHook(() => useRateLimit(2, 1000));
		const { result: result2 } = renderHook(() => useRateLimit(2, 1000));

		act(() => {
			expect(result1.current()).toBe(true);
			expect(result1.current()).toBe(true);
			expect(result2.current()).toBe(true);
			expect(result2.current()).toBe(true);
		});

		// Both should be at their limit independently
		act(() => {
			expect(result1.current()).toBe(false);
			expect(result2.current()).toBe(false);
		});
	});

	it("should handle zero limit", () => {
		const { result } = renderHook(() => useRateLimit(0, 1000));

		act(() => {
			expect(result.current()).toBe(false);
		});

		expect(toast.error).toHaveBeenCalled();
	});

	it("should handle very short time windows", () => {
		const { result } = renderHook(() => useRateLimit(2, 10));

		act(() => {
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(true);
			expect(result.current()).toBe(false);
		});

		act(() => {
			vi.advanceTimersByTime(11);
		});

		act(() => {
			expect(result.current()).toBe(true);
		});
	});
});
