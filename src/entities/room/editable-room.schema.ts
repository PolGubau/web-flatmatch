import { z } from "zod";

export const RentTypeSchema = z.enum(["room", "shared", "entire"]);
export type RentType = z.infer<typeof RentTypeSchema>;
export const PaymentFrequencySchema = z.enum(["monthly", "weekly", "daily"]);
export const stayUnits = ["day", "week", "month", "year"] as const;
export const StayUnitSchema = z.enum(stayUnits);
export const BedTypeSchema = z.enum([
	"single",
	"double",
	"bunk",
	"sofa",
	"none",
]);
export const RoomStatusSchema = z.enum(["available", "booked", "unlisted"]);
export type RoomStatus = z.infer<typeof RoomStatusSchema>;
export const ZipCodeSchema = z
	.string()
	.regex(/^\d{5}$/, "Selecciona una calle correcta");

// Sub-schemas
export const LocationSchema = z.object({
	address: z.string().min(2),
	city: z.string().default("Barcelona"),
	country: z.string(),
	lat: z.number(),
	lng: z.number(),
	postalCode: ZipCodeSchema.optional(),
});
export type RoomLocation = z.infer<typeof LocationSchema>;

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
export type RoomPrice = z.infer<typeof PriceSchema>;

export const CommoditiesWholeSchema = z.object({
	appliances: z.object({
		hasAirConditioning: z.boolean(),
		hasCoffeeMaker: z.boolean(),
		hasDishwasher: z.boolean(),
		hasDryer: z.boolean(),
		hasElevator: z.boolean(),
		hasHeating: z.boolean(),
		hasLaundry: z.boolean(),
		hasMicrowave: z.boolean(),
		hasOven: z.boolean(),
		hasRefrigerator: z.boolean(),
		hasTV: z.boolean(),
		hasWifi: z.boolean(),
		isWheelchairAccessible: z.boolean(),
	}),
	area: z.number(),
	areUtilitiesIncluded: z.boolean(),
	bathrooms: z.number(),
	bedrooms: z.object({
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
export type RoomCommoditiesWhole = z.infer<typeof CommoditiesWholeSchema>;
export const CommoditiesRoomSchema = z.object({
	area: z.number(),
	bedType: BedTypeSchema,
	hasBalcony: z.boolean(),
	hasPrivateBathroom: z.boolean(),
	hasWindow: z.boolean(),
	hasWorkingDesk: z.boolean(),
	isFurnished: z.boolean(),
});
export type RoomCommoditiesRoom = z.infer<typeof CommoditiesRoomSchema>;

export const CommoditiesSchema = z.object({
	room: CommoditiesRoomSchema.optional(),
	whole: CommoditiesWholeSchema,
});
export type RoomCommodities = z.infer<typeof CommoditiesSchema>;

export const RulesSchema = z.object({
	childrenAllowed: z.boolean(),
	coupleAllowed: z.boolean(),
	guestsAllowed: z.boolean(),
	partiesAllowed: z.boolean(),
	petsAllowed: z.boolean(),
	smokingAllowed: z.boolean(),
});
export type RoomRules = z.infer<typeof RulesSchema>;

export const EditableImagesSchema = z.object({
	coverIndex: z.number(),
	gallery: z.array(z.union([z.instanceof(File), z.string()])).min(1),
});
export type RoomEditableImages = z.infer<typeof EditableImagesSchema>;

export const TimingsSchema = z.object({
	availableFrom: z.string(),
	availableUntil: z.string().optional(),
	maximumStay: z
		.object({
			unit: StayUnitSchema,
			value: z.number(),
		})
		.optional(),
	minimumStay: z
		.object({
			unit: StayUnitSchema,
			value: z.number(),
		})
		.optional(),
});
export type RoomTimings = z.infer<typeof TimingsSchema>;

export const WhoIsLivingSchema = z.object({
	currentTenants: z.object({
		female: z.number(),
		male: z.number(),
		other: z.number(),
	}),
	ownerLivesHere: z.boolean(),
});
export type RoomWhoIsLiving = z.infer<typeof WhoIsLivingSchema>;

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
export type RoomContact = z.infer<typeof ContactSchema>;
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
export type RoomPreferences = z.infer<typeof PreferencesSchema>;

export const EditableRoomSchema = z.object({
	commodities: CommoditiesSchema,

	contact: ContactSchema,
	description: z.string(),

	images: EditableImagesSchema,

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
