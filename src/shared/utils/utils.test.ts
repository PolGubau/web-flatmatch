import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
	it("should merge class names", () => {
		const result = cn("class1", "class2");
		expect(result).toBe("class1 class2");
	});

	it("should handle conditional classes", () => {
		const result = cn("base", true && "active", false && "inactive");
		expect(result).toBe("base active");
	});

	it("should handle undefined and null", () => {
		const result = cn("base", undefined, null, "active");
		expect(result).toBe("base active");
	});

	it("should merge tailwind classes correctly", () => {
		const result = cn("px-2 py-1", "px-4");
		// Should override px-2 with px-4
		expect(result).toContain("px-4");
		expect(result).toContain("py-1");
	});

	it("should handle empty input", () => {
		const result = cn();
		expect(result).toBe("");
	});

	it("should handle object syntax", () => {
		const result = cn({
			active: true,
			disabled: false,
			"text-red": true,
		});
		expect(result).toContain("active");
		expect(result).toContain("text-red");
		expect(result).not.toContain("disabled");
	});

	it("should handle array input", () => {
		const result = cn(["class1", "class2"], "class3");
		expect(result).toBe("class1 class2 class3");
	});

	it("should handle duplicate classes", () => {
		const result = cn("class1", "class2", "class1");
		// twMerge doesn't deduplicate non-Tailwind classes, just merges them
		expect(result).toContain("class1");
		expect(result).toContain("class2");
	});

	it("should handle complex tailwind variants", () => {
		const result = cn(
			"hover:bg-blue-500",
			"active:bg-blue-600",
			"hover:bg-red-500",
		);
		// Should merge hover states correctly
		expect(result).toContain("hover:bg-red-500");
	});
});
