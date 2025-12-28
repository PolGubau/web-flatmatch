import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { dateToYearsAgo } from "./date-to-years-ago";

describe("dateToYearsAgo", () => {
	const fixedNow = new Date(2025, 5, 15, 12, 0, 0, 0); // June 15, 2025 12:00 local

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(fixedNow);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns 0 for a date in the same year", () => {
		const date = new Date(2025, 0, 1); // Jan 1, 2025
		expect(dateToYearsAgo(date)).toBe(0);
	});

	it("returns 1 for a date in the previous year", () => {
		const date = new Date(2024, 11, 31); // Dec 31, 2024
		expect(dateToYearsAgo(date)).toBe(1);
	});

	it("returns correct difference for multiple years ago", () => {
		const date = new Date(2015, 5, 15); // June 15, 2015
		expect(dateToYearsAgo(date)).toBe(10);
	});

	it("returns negative for a date in the future", () => {
		const date = new Date(2026, 0, 1); // Jan 1, 2026
		expect(dateToYearsAgo(date)).toBe(-1);
	});

	it("ignores month/day and only uses year difference", () => {
		// Now: June 15, 2025; earlier in the same year should still be 0
		const dateSameYearEarlier = new Date(2025, 2, 1); // Mar 1, 2025
		expect(dateToYearsAgo(dateSameYearEarlier)).toBe(0);

		// Crossing year boundary should be 1
		const datePrevYearLate = new Date(2024, 11, 31); // Dec 31, 2024
		expect(dateToYearsAgo(datePrevYearLate)).toBe(1);
	});

	it("handles new year boundary cases explicitly", () => {
		vi.setSystemTime(new Date(2025, 0, 1, 12)); // Jan 1, 2025
		expect(dateToYearsAgo(new Date(2024, 11, 31, 23))).toBe(1);

		vi.setSystemTime(new Date(2025, 11, 31, 12)); // Dec 31, 2025
		expect(dateToYearsAgo(new Date(2025, 0, 1, 0))).toBe(0);
	});
});
