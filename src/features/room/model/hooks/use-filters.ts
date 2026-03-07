import {
	createParser,
	parseAsBoolean,
	parseAsInteger,
	parseAsStringLiteral,
	useQueryStates,
} from "nuqs";
import { RENT_TYPES } from "~/features/publish-room/ui/1-type/step";
import { availableLocations } from "../../ui/feed/filters/filters-form";

/**
 * Valores por defecto para filtros.
 * Se aplican en el backend cuando el valor es null, no en la URL.
 */
export const DEFAULT_FILTER_VALUES = {
	maxPrice: 5000,
	minPrice: 0,
} as const;

/**
 * Parser personalizado para fechas ISO que es más robusto en Safari/iOS
 * Safari tiene problemas con ciertos formatos de fecha ISO
 */
const parseAsIsoDateSafe = createParser({
	parse(queryValue) {
		try {
			// Safari en iOS puede tener problemas con ciertos formatos ISO
			// Intentar parsear la fecha de forma más robusta
			const date = new Date(queryValue);

			// Verificar que la fecha es válida
			if (Number.isNaN(date.getTime())) {
				return null;
			}

			return date;
		} catch {
			return null;
		}
	},
	serialize(value) {
		try {
			return value.toISOString();
		} catch {
			return "";
		}
	},
});

/**
 * Hook que sincroniza los filtros con la URL usando nuqs.
 * Los cambios en filtros se reflejan automáticamente en los query params.
 */
export function useFilters() {
	return useQueryStates(
		{
			afterDate: parseAsIsoDateSafe,
			hasAirConditioning: parseAsBoolean,
			hasBalcony: parseAsBoolean,
			hasDishwasher: parseAsBoolean,
			hasElevator: parseAsBoolean,
			hasGarden: parseAsBoolean,
			hasHeating: parseAsBoolean,
			hasLaundry: parseAsBoolean,
			hasParking: parseAsBoolean,
			hasPool: parseAsBoolean,
			hasPrivateBathroom: parseAsBoolean,
			hasTerrace: parseAsBoolean,
			hasTV: parseAsBoolean,

			// Amenidades - Usar solo parseAsBoolean sin default (devuelve null si no está)
			hasWifi: parseAsBoolean,
			hasWorkingDesk: parseAsBoolean,
			isFurnished: parseAsBoolean,
			isWheelchairAccessible: parseAsBoolean,
			location: parseAsStringLiteral(availableLocations),
			maxPrice: parseAsInteger,
			minPrice: parseAsInteger,
			rentType: parseAsStringLiteral(
				RENT_TYPES.map((rentType) => rentType.value),
			),
		},
		{
			// Configuración de nuqs - usar replace en lugar de push para evitar problemas en Safari/iOS
			history: "replace", // Cambiar a replace para mejor compatibilidad con iOS
			shallow: false, // No shallow para que React Router detecte cambios
		},
	);
}
