import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";
import { availableLocations } from "../../ui/feed/filters/filters-form";
export function useFilters() {
	return useQueryStates({
		location: parseAsStringEnum(availableLocations as unknown as string[]) || null,
		maxPrice: parseAsInteger,
		minPrice: parseAsInteger,
	});
}
