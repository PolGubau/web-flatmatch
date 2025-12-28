import { describe, expect, it } from "vitest";
import { currencyFormat } from "./currencyFormat";

describe("currencyFormat", () => {
	it("should format EUR currency correctly with Spanish locale", () => {
		const result = currencyFormat(1234.56, "EUR");
		expect(result).toContain("1234,56");
		expect(result).toContain("€");
	});

	it("should format USD currency correctly with Spanish locale", () => {
		const result = currencyFormat(1234.56, "USD");
		expect(result).toContain("1234,56");
		expect(result).toContain("$");
	});

	it("should format GBP currency correctly with Spanish locale", () => {
		const result = currencyFormat(1234.56, "GBP");
		expect(result).toContain("1234,56");
		expect(result).toContain("GBP");
	});

	it("should handle zero amount", () => {
		const result = currencyFormat(0, "EUR");
		expect(result).toContain("0");
		expect(result).toContain("€");
	});

	it("should handle negative amounts", () => {
		const result = currencyFormat(-100, "EUR");
		expect(result).toContain("-100");
		expect(result).toContain("€");
	});

	it("should round to nearest integer by default", () => {
		expect(currencyFormat(10.999, "EUR")).toContain("11");
		expect(currencyFormat(10.001, "EUR")).toContain("10");
	});

	it("should handle large numbers with thousands separator", () => {
		const result = currencyFormat(1000000, "EUR");
		expect(result).toContain("1.000.000");
		expect(result).toContain("€");
	});

	it("should handle small decimal numbers", () => {
		expect(currencyFormat(0.01, "EUR")).toContain("0");
		expect(currencyFormat(0.99, "EUR")).toContain("€");
	});

	it("should default to EUR if currency not provided", () => {
		expect(currencyFormat(100)).toContain("100");
		expect(currencyFormat(100)).toContain("€");
	});

	it("should handle unknown currencies gracefully", () => {
		expect(currencyFormat(100, "XYZ" as any)).toContain("100");
	});

	it("should respect custom locale parameter", () => {
		const usFormat = currencyFormat(1234.56, "USD", "en-US");
		expect(usFormat).toContain("1,234");
		expect(usFormat).toContain("$");
	});
});
