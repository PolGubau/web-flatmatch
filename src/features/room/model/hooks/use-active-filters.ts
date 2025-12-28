import { useMemo } from "react";
import { DEFAULT_FILTER_VALUES, useFilters } from "./use-filters";

export function useActiveFilters() {
	const [filters, setFilters] = useFilters();

	// Calcular el número de filtros activos (excluyendo valores null y defaults)
	const activeFiltersCount = useMemo(() => {
		return Object.entries(filters).filter(([key, value]) => {
			// Excluir null, undefined, false
			if (value === null || value === undefined || value === false)
				return false;

			// Excluir valores por defecto de precio
			if (key === "minPrice" && value === DEFAULT_FILTER_VALUES.minPrice)
				return false;
			if (key === "maxPrice" && value === DEFAULT_FILTER_VALUES.maxPrice)
				return false;

			return true;
		}).length;
	}, [filters]);

	// Eliminar un filtro específico
	const removeFilter = (key: keyof typeof filters) => {
		setFilters({ [key]: null } as any);
	};

	// Limpiar todos los filtros de amenidades
	const clearAllFilters = () => {
		const amenityKeys = [
			"hasWifi",
			"hasAirConditioning",
			"hasHeating",
			"hasLaundry",
			"hasElevator",
			"hasDishwasher",
			"hasTV",
			"hasParking",
			"hasTerrace",
			"hasBalcony",
			"hasGarden",
			"hasPool",
			"hasPrivateBathroom",
			"hasWorkingDesk",
			"isFurnished",
			"isWheelchairAccessible",
		] as const;

		const resetValues = Object.fromEntries(
			amenityKeys.map((key) => [key, null]),
		) as any;

		setFilters(resetValues);
	};

	return {
		activeFiltersCount,
		clearAllFilters,
		filters,
		removeFilter,
	};
}
