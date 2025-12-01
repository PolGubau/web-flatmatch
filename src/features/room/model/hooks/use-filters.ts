import {
	parseAsInteger,
	parseAsIsoDate,
	parseAsStringLiteral,
	useQueryStates,
} from "nuqs";
import { RENT_TYPES } from "~/features/publish-room/ui/1-type/step";
import { availableLocations } from "../../ui/feed/filters/filters-form";
export function useFilters() {
	return useQueryStates({
		afterDate: parseAsIsoDate,
		location: parseAsStringLiteral(availableLocations) || null,
		maxPrice: parseAsInteger.withDefault(5000),
		minPrice: parseAsInteger.withDefault(0),
		rentType:
			parseAsStringLiteral(RENT_TYPES.map((rentType) => rentType.value)) ||
			null,
	});
}
