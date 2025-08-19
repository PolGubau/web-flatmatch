import { z } from "zod";

export const RentTypeSchema = z.enum(["room", "shared", "entire"]);
export const PaymentFrequencySchema = z.enum(["monthly", "weekly", "daily"]);
export const StayUnitSchema = z.enum(["day", "week", "month", "year"]);
export const BedTypeSchema = z.enum(["single", "double", "bunk", "sofa", "none"]);
export const RoomStatusSchema = z.enum(["available", "booked", "unlisted"]);
export const ZipCodeSchema = z.string().regex(/^\d{5}$/, "El código postal debe tener 5 dígitos");

// Sub-schemas
export const LocationSchema = z.object({
	address: z.string(),
	city: z.string().default("Barcelona"),
	country: z.string(),
	lat: z.number(),
	lng: z.number(),
	postalCode: ZipCodeSchema.optional(),
});

export const PriceSchema = z.object({
	additionalCosts: z.object({
		deposit: z.number(),
		otherFees: z.number().optional(),
		utilities: z.number(),
	}),
	amount: z.number(),
	currency: z.string(),
	isIncluded: z.boolean(),
	isNegotiable: z.boolean(),
	localePrice: z.string(),
	paymentFrequency: PaymentFrequencySchema,
});

export const CommoditiesSharedSchema = z.object({
	hasAirConditioning: z.boolean(),
	hasElevator: z.boolean(),
	hasHeating: z.boolean(),
	hasKitchen: z.boolean(),
	hasLaundry: z.boolean(),
	hasWifi: z.boolean(),
	isWheelchairAccessible: z.boolean(),
});

export const CommoditiesWholeSchema = z.object({
	appliances: z.object({
		hasCoffeeMaker: z.boolean(),
		hasDishwasher: z.boolean(),
		hasDryer: z.boolean(),
		hasMicrowave: z.boolean(),
		hasOven: z.boolean(),
		hasRefrigerator: z.boolean(),
		hasTV: z.boolean(),
		hasWashingMachine: z.boolean(),
	}),
	area: z.number(),
	areUtilitiesIncluded: z.boolean(),
	bathrooms: z.number(),
	bedrooms: z.object({
		double: z.number(),
		individual: z.number(),
		shared: z.number(),
	}),
	extras: z.object({
		hasGarden: z.boolean(),
		hasParking: z.boolean(),
		hasPool: z.boolean(),
		hasTerrace: z.boolean(),
	}),
});

export const CommoditiesRoomSchema = z.object({
	area: z.number(),
	bedType: BedTypeSchema,
	hasBalcony: z.boolean(),
	hasPrivateBathroom: z.boolean(),
	hasWindow: z.boolean(),
	hasWorkingDesk: z.boolean(),
	isFurnished: z.boolean(),
});

export const CommoditiesSchema = z.object({
	room: CommoditiesRoomSchema.optional(),
	shared: CommoditiesSharedSchema.optional(),
	whole: CommoditiesWholeSchema.optional(),
});

export const RulesSchema = z.object({
	childrenAllowed: z.boolean(),
	coupleAllowed: z.boolean(),
	guestsAllowed: z.boolean(),
	partiesAllowed: z.boolean(),
	petsAllowed: z.boolean(),
	quietHours: z.union([
		z.literal(false),
		z.object({
			from: z.string(),
			to: z.string(),
		}),
	]),
	smokingAllowed: z.boolean(),
});

export const ImagesSchema = z.object({
	gallery: z.array(z.string()),
	main: z.string(),
});

export const TimingsSchema = z.object({
	availableFrom: z.coerce.date(),
	availableUntil: z.coerce.date().optional(),
	maximumStay: z.union([
		z.object({
			unit: StayUnitSchema,
			value: z.number(),
		}),
		z.undefined(),
	]),
	minimumStay: z.object({
		unit: StayUnitSchema,
		value: z.number(),
	}),
});

export const WhoIsLivingSchema = z.object({
	currentTenants: z.object({
		female: z.number(),
		male: z.number(),
		other: z.number(),
	}),
	ownerLivesHere: z.boolean(),
});

export const ContactSchema = z.object({
	agent: z
		.object({
			email: z.string(),
			name: z.string(),
			phone: z.string(),
		})
		.optional(),
	owner: z.object({
		email: z.string(),
		name: z.string(),
		phone: z.string(),
	}),
});

export const PreferencesSchema = z.object({
	age: z.object({
		max: z.number(),
		min: z.number(),
	}),
	currentOccupation: z.object({
		employed: z.boolean(),
		other: z.boolean(),
		student: z.boolean(),
		unemployed: z.boolean(),
	}),
	gender: z.object({
		female: z.boolean(),
		male: z.boolean(),
		other: z.boolean(),
	}),
});

export const VerificationSchema = z.union([
	z.literal(false),
	z.object({
		date: z.coerce.date(),
	}),
]);

export const EditableRoomSchema = z.object({
	commodities: CommoditiesSchema,

	contact: ContactSchema,
	description: z.string(),

	images: ImagesSchema,

	isVerified: VerificationSchema,

	location: LocationSchema,

	preferences: PreferencesSchema,
	price: PriceSchema,

	rentType: RentTypeSchema,
	rules: RulesSchema,

	status: RoomStatusSchema,

	timings: TimingsSchema,
	title: z.string(),
	whoIsLiving: WhoIsLivingSchema,
});
