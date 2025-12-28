import { useMemo } from "react";
import { useFilters } from "./use-filters";

export function useActiveFilters() {
	const [filters, setFilters] = useFilters();

	// Calcular el número de filtros activos
	const activeFiltersCount = useMemo(() => {
		return Object.entries(filters).filter(
			([_, value]) =>
				value !== null && value !== undefined && value !== false && value !== 0,
		).length;
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
