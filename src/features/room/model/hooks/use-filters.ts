import { parseAsFloat, parseAsStringEnum, useQueryStates } from "nuqs";
export function useFilters() {
	return useQueryStates({
		location: parseAsStringEnum([
			"Barcelona",
			"Girona",
			"Tarragona",
			"Lleida",
			"Milano",
			"Roma",
		]),
		maxPrice: parseAsFloat,
		minPrice: parseAsFloat,
	});
}
