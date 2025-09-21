import { describe, expect, it } from "vitest";
import { getDistanceKm } from "./get-distance-km";

describe("getDistanceKm", () => {
	it("debería calcular distancia aproximada entre Barcelona y Madrid", () => {
		const barcelona = { lat: 41.3874, lon: 2.1686 };
		const madrid = { lat: 40.4168, lon: -3.7038 };
		const km = getDistanceKm(
			barcelona.lat,
			barcelona.lon,
			madrid.lat,
			madrid.lon,
		);
		expect(Math.round(km)).toBe(505); // ~505 km
	});

	it("debería devolver 0 si las coordenadas son iguales", () => {
		const km = getDistanceKm(41.3874, 2.1686, 41.3874, 2.1686);
		expect(km).toBe(0);
	});
});
