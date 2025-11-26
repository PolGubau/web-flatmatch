import {
	parseAsInteger,
	parseAsIsoDate,
	parseAsStringEnum,
	useQueryStates,
} from "nuqs";
import { availableLocations } from "../../ui/feed/filters/filters-form";
export function useFilters() {
	return useQueryStates({
		afterDate: parseAsIsoDate,
		location:
			parseAsStringEnum(availableLocations as unknown as string[]) || null,
		maxPrice: parseAsInteger,
		minPrice: parseAsInteger,
	});
}
