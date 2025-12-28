import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useHapticFeedback } from "./use-haptic-feedback";

describe("useHapticFeedback", () => {
	let vibrateSpy: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		vibrateSpy = vi.fn();
		Object.defineProperty(navigator, "vibrate", {
			configurable: true,
			value: vibrateSpy,
			writable: true,
		});
	});

	it("should trigger vibration with correct duration for light style", () => {
		const { result } = renderHook(() => useHapticFeedback());

		act(() => {
			result.current("light");
		});

		expect(vibrateSpy).toHaveBeenCalledWith(10);
	});

	it("should trigger vibration with correct duration for medium style", () => {
		const { result } = renderHook(() => useHapticFeedback());

		act(() => {
			result.current("medium");
		});

		expect(vibrateSpy).toHaveBeenCalledWith(20);
	});

	it("should trigger vibration with correct duration for heavy style", () => {
		const { result } = renderHook(() => useHapticFeedback());

		act(() => {
			result.current("heavy");
		});

		expect(vibrateSpy).toHaveBeenCalledWith(50);
	});

	it("should trigger vibration with correct duration for rigid style", () => {
		const { result } = renderHook(() => useHapticFeedback());

		act(() => {
			result.current("rigid");
		});

		expect(vibrateSpy).toHaveBeenCalledWith(15);
	});

	it("should trigger vibration with correct duration for soft style", () => {
		const { result } = renderHook(() => useHapticFeedback());

		act(() => {
			result.current("soft");
		});

		expect(vibrateSpy).toHaveBeenCalledWith(5);
	});

	it("should default to light style when no argument provided", () => {
		const { result } = renderHook(() => useHapticFeedback());

		act(() => {
			result.current();
		});

		expect(vibrateSpy).toHaveBeenCalledWith(10);
	});

	it("should not throw error when vibrate is not supported", () => {
		// Remove vibrate support
		const descriptor = Object.getOwnPropertyDescriptor(navigator, "vibrate");
		if (descriptor) {
			delete (navigator as any).vibrate;
		}

		const { result } = renderHook(() => useHapticFeedback());

		expect(() => {
			act(() => {
				result.current("heavy");
			});
		}).not.toThrow();

		// Restore
		if (descriptor) {
			Object.defineProperty(navigator, "vibrate", descriptor);
		}
	});

	it("should handle webkit message handlers for iOS", () => {
		const postMessageSpy = vi.fn();
		(window as any).webkit = {
			messageHandlers: {
				hapticFeedback: {
					postMessage: postMessageSpy,
				},
			},
		};

		const { result } = renderHook(() => useHapticFeedback());

		act(() => {
			result.current("medium");
		});

		expect(postMessageSpy).toHaveBeenCalledWith("medium");

		// Cleanup
		delete (window as any).webkit;
	});

	it("should return the same function reference on re-renders", () => {
		const { result, rerender } = renderHook(() => useHapticFeedback());

		const firstRender = result.current;
		rerender();
		const secondRender = result.current;

		expect(firstRender).toBe(secondRender);
	});
});
