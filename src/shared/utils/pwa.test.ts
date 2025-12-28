import { beforeEach, describe, expect, it, vi } from "vitest";
import { isIOS, isIOSSafari, isStandalone } from "./pwa";

describe("PWA utilities", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("isIOS", () => {
		it("should detect iPhone", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
				writable: true,
			});

			expect(isIOS()).toBe(true);
		});

		it("should detect iPad", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value: "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)",
				writable: true,
			});

			expect(isIOS()).toBe(true);
		});

		it("should detect iPod", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value: "Mozilla/5.0 (iPod touch; CPU iPhone OS 14_0 like Mac OS X)",
				writable: true,
			});

			expect(isIOS()).toBe(true);
		});

		it("should detect iPad with MacIntel platform and touch points", () => {
			Object.defineProperty(window.navigator, "platform", {
				configurable: true,
				value: "MacIntel",
				writable: true,
			});
			Object.defineProperty(window.navigator, "maxTouchPoints", {
				configurable: true,
				value: 5,
				writable: true,
			});

			expect(isIOS()).toBe(true);
		});

		it("should not detect MacOS as iOS", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
				writable: true,
			});
			Object.defineProperty(window.navigator, "platform", {
				configurable: true,
				value: "MacIntel",
				writable: true,
			});
			Object.defineProperty(window.navigator, "maxTouchPoints", {
				configurable: true,
				value: 0,
				writable: true,
			});

			expect(isIOS()).toBe(false);
		});

		it("should not detect Android", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value: "Mozilla/5.0 (Linux; Android 10)",
				writable: true,
			});

			expect(isIOS()).toBe(false);
		});

		it("should return false in server environment", () => {
			const originalWindow = global.window;
			// @ts-expect-error - testing server-side
			delete global.window;

			expect(isIOS()).toBe(false);

			global.window = originalWindow;
		});
	});

	describe("isIOSSafari", () => {
		beforeEach(() => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
				writable: true,
			});
		});

		it("should detect Safari on iOS", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value:
					"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
				writable: true,
			});

			expect(isIOSSafari()).toBe(true);
		});

		it("should not detect Chrome on iOS as Safari", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value:
					"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1",
				writable: true,
			});

			expect(isIOSSafari()).toBe(false);
		});

		it("should not detect Firefox on iOS as Safari", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value:
					"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/29.0 Mobile/15E148 Safari/605.1.15",
				writable: true,
			});

			expect(isIOSSafari()).toBe(false);
		});

		it("should return false when not on iOS", () => {
			Object.defineProperty(window.navigator, "userAgent", {
				configurable: true,
				value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
				writable: true,
			});

			expect(isIOSSafari()).toBe(false);
		});
	});

	describe("isStandalone", () => {
		it("should detect standalone mode on iOS", () => {
			(window.navigator as any).standalone = true;
			Object.defineProperty(window, "matchMedia", {
				configurable: true,
				value: vi.fn().mockImplementation((query) => ({
					matches: false,
					media: query,
				})),
				writable: true,
			});

			expect(isStandalone()).toBe(true);

			delete (window.navigator as any).standalone;
		});

		it("should detect standalone mode using display-mode", () => {
			Object.defineProperty(window, "matchMedia", {
				configurable: true,
				value: vi.fn().mockImplementation((query) => ({
					matches: query === "(display-mode: standalone)",
					media: query,
				})),
				writable: true,
			});

			expect(isStandalone()).toBe(true);
		});

		it("should return false when not in standalone mode", () => {
			(window.navigator as any).standalone = false;
			Object.defineProperty(window, "matchMedia", {
				configurable: true,
				value: vi.fn().mockImplementation(() => ({
					matches: false,
					media: "",
				})),
				writable: true,
			});

			expect(isStandalone()).toBe(false);
		});
	});
});
