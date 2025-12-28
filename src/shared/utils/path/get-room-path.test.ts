import { describe, expect, it } from "vitest";
import { getRoomPath } from "./get-room-path";

describe("getRoomPath", () => {
	it("should build the room path with the current domain and room id", () => {
		const result = getRoomPath("abc123");
		expect(result).toContain("/room/abc123");
		expect(result).toMatch(/^https?:\/\/.+\/room\/abc123$/);
	});

	it("should handle different room ids", () => {
		expect(getRoomPath("room1")).toContain("/room/room1");
		expect(getRoomPath("test-room-456")).toContain("/room/test-room-456");
	});

	it("should return a valid URL structure", () => {
		const result = getRoomPath("xyz");
		expect(result).toContain("/room/");
		expect(result).toContain("xyz");
	});
});
