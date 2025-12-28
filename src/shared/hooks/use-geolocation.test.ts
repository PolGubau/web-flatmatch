import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock geolocation
const mockGeolocation = {
	clearWatch: vi.fn(),
	getCurrentPosition: vi.fn(),
	watchPosition: vi.fn(),
};

Object.defineProperty(global.navigator, "geolocation", {
	configurable: true,
	value: mockGeolocation,
	writable: true,
});

// Necesitamos importar después de definir el mock
import { useGeolocation } from "./use-geolocation";

describe("useGeolocation", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should start with loading state", () => {
		mockGeolocation.getCurrentPosition.mockImplementation(() => {});

		const { result } = renderHook(() => useGeolocation());

		expect(result.current.loading).toBe(true);
		expect(result.current.coords).toBeNull();
		expect(result.current.error).toBeNull();
	});

	it("should return coordinates on success", async () => {
		const mockPosition = {
			coords: {
				accuracy: 10,
				altitude: null,
				altitudeAccuracy: null,
				heading: null,
				latitude: 41.3851,
				longitude: 2.1734,
				speed: null,
			},
			timestamp: Date.now(),
		};

		mockGeolocation.getCurrentPosition.mockImplementation((success) =>
			success(mockPosition),
		);

		const { result } = renderHook(() => useGeolocation());

		await vi.waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.coords).toEqual({
			lat: 41.3851,
			lon: 2.1734,
		});
		expect(result.current.error).toBeNull();
	});

	it("should return error on failure", async () => {
		const mockError = {
			code: 1,
			message: "User denied geolocation",
			PERMISSION_DENIED: 1,
			POSITION_UNAVAILABLE: 2,
			TIMEOUT: 3,
		};

		mockGeolocation.getCurrentPosition.mockImplementation((_, error) =>
			error(mockError),
		);

		const { result } = renderHook(() => useGeolocation());

		await vi.waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.coords).toBeNull();
		expect(result.current.error).toBe("User denied geolocation");
	});

	it("should handle geolocation not supported", () => {
		const descriptor = Object.getOwnPropertyDescriptor(
			navigator,
			"geolocation",
		);
		delete (navigator as any).geolocation;

		const { result } = renderHook(() => useGeolocation());

		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBe(
			"GeoLocation is not supported by your browser",
		);

		// Restore
		if (descriptor) {
			Object.defineProperty(navigator, "geolocation", descriptor);
		}
	});

	it("should handle timeout errors", async () => {
		const mockError = {
			code: 3,
			message: "Timeout",
			PERMISSION_DENIED: 1,
			POSITION_UNAVAILABLE: 2,
			TIMEOUT: 3,
		};

		mockGeolocation.getCurrentPosition.mockImplementation((_, error) =>
			error(mockError),
		);

		const { result } = renderHook(() => useGeolocation());

		await vi.waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toBe("Timeout");
	});

	it("should handle position unavailable errors", async () => {
		const mockError = {
			code: 2,
			message: "Position unavailable",
			PERMISSION_DENIED: 1,
			POSITION_UNAVAILABLE: 2,
			TIMEOUT: 3,
		};

		mockGeolocation.getCurrentPosition.mockImplementation((_, error) =>
			error(mockError),
		);

		const { result } = renderHook(() => useGeolocation());

		await vi.waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toBe("Position unavailable");
	});
});
