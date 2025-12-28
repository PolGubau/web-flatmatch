import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should return initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("initial", 500));

		expect(result.current).toBe("initial");
	});

	it("should debounce value updates", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { delay: 500, value: "initial" },
			},
		);

		expect(result.current).toBe("initial");

		// Update value
		rerender({ delay: 500, value: "updated" });

		// Value should not change immediately
		expect(result.current).toBe("initial");

		// Fast-forward time
		act(() => {
			vi.advanceTimersByTime(500);
		});

		// Now value should be updated
		expect(result.current).toBe("updated");
	});

	it("should cancel previous timeout on rapid updates", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { delay: 500, value: "initial" },
			},
		);

		rerender({ delay: 500, value: "update1" });

		act(() => {
			vi.advanceTimersByTime(300);
		});

		rerender({ delay: 500, value: "update2" });

		act(() => {
			vi.advanceTimersByTime(300);
		});

		// Should still be initial because timeouts were cancelled
		expect(result.current).toBe("initial");

		act(() => {
			vi.advanceTimersByTime(200);
		});

		// Now should be update2
		expect(result.current).toBe("update2");
	});

	it("should handle different delay values", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { delay: 1000, value: "initial" },
			},
		);

		rerender({ delay: 1000, value: "updated" });

		act(() => {
			vi.advanceTimersByTime(500);
		});

		expect(result.current).toBe("initial");

		act(() => {
			vi.advanceTimersByTime(500);
		});

		expect(result.current).toBe("updated");
	});

	it("should handle zero delay", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { delay: 0, value: "initial" },
			},
		);

		rerender({ delay: 0, value: "updated" });

		act(() => {
			vi.runAllTimers();
		});

		expect(result.current).toBe("updated");
	});

	it("should handle multiple rapid updates", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { delay: 500, value: "initial" },
			},
		);

		for (let i = 1; i <= 5; i++) {
			rerender({ delay: 500, value: `update${i}` });
			act(() => {
				vi.advanceTimersByTime(100);
			});
		}

		// Still should be initial
		expect(result.current).toBe("initial");

		act(() => {
			vi.advanceTimersByTime(400);
		});

		// Should be last update
		expect(result.current).toBe("update5");
	});

	it("should cleanup timeout on unmount", () => {
		const { unmount, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { delay: 500, value: "initial" },
			},
		);

		rerender({ delay: 500, value: "updated" });

		unmount();

		act(() => {
			vi.runAllTimers();
		});

		// No error should be thrown
	});
});
