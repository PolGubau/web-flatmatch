/**
 * Amenidades filtrables en el sistema
 */
export const FILTERABLE_AMENITIES = {
	hasAirConditioning: "has_air_conditioning",
	hasBalcony: "has_balcony",
	hasDishwasher: "has_dishwasher",
	hasElevator: "has_elevator",
	hasGarden: "has_garden",
	hasHeating: "has_heating",
	hasLaundry: "has_laundry",

	// Extras
	hasParking: "has_parking",
	hasPool: "has_pool",

	// Habitación
	hasPrivateBathroom: "has_private_bathroom",
	hasTerrace: "has_terrace",
	hasTV: "has_tv",
	// Electrodomésticos
	hasWifi: "has_wifi",
	hasWorkingDesk: "has_working_desk",
	isFurnished: "is_furnished",

	// Accesibilidad
	isWheelchairAccessible: "is_wheelchair_accessible",
} as const;

export type AmenityKey = keyof typeof FILTERABLE_AMENITIES;
export type AmenityValue = (typeof FILTERABLE_AMENITIES)[AmenityKey];

/**
 * Grupos de amenidades para organización en UI
 */
export const AMENITY_GROUPS = {
	accessibility: ["isWheelchairAccessible"] as const,
	appliances: [
		"hasWifi",
		"hasAirConditioning",
		"hasHeating",
		"hasLaundry",
		"hasElevator",
		"hasDishwasher",
		"hasTV",
	] as const,
	extras: [
		"hasParking",
		"hasTerrace",
		"hasBalcony",
		"hasGarden",
		"hasPool",
	] as const,
	room: ["hasPrivateBathroom", "hasWorkingDesk", "isFurnished"] as const,
} as const;

export type AmenityGroup = keyof typeof AMENITY_GROUPS;
