import type { EditableRoom } from "./editable-room";

export const emptyEditableRoom: EditableRoom = {
	commodities: {
		room: {
			area: undefined as unknown as number,
			bedType: "single",
			hasBalcony: false,
			hasPrivateBathroom: false,
			hasWindow: false,
			hasWorkingDesk: false,
			isFurnished: false,
		},
		whole: {
			appliances: {
				hasAirConditioning: false,
				hasCoffeeMaker: false,
				hasDishwasher: false,
				hasDryer: false,
				hasElevator: false,
				hasHeating: false,
				hasLaundry: false,
				hasMicrowave: false,
				hasOven: false,
				hasRefrigerator: false,
				hasTV: false,
				hasWifi: false,
				isWheelchairAccessible: false,
			},
			area: undefined as unknown as number,
			areUtilitiesIncluded: false,
			bathrooms: undefined as unknown as number,
			bedrooms: {
				individual: undefined as unknown as number,
				shared: undefined as unknown as number,
			},
			extras: {
				hasGarden: false,
				hasParking: false,
				hasPool: false,
				hasTerrace: false,
			},
		},
	},
	contact: {
		owner: {
			email: "",
			name: "",
			phone: "",
		},
	},
	description: "",
	images: {
		coverIndex: 0,
		gallery: [],
	},
	location: {
		address: "",
		city: "",
		country: "",
		lat: 0,
		lng: 0,
		postalCode: "",
	},
	preferences: {
		age: {
			max: 100,
			min: 0,
		},
		currentOccupation: {
			employed: true,
			other: true,
			student: true,
			unemployed: true,
		},
		gender: {
			female: true,
			male: true,
			other: true,
		},
	},
	price: {
		additionalCosts: {
			deposit: 0,
			otherFees: 0,
			utilities: 0,
		},
		amount: null as unknown as number,
		currency: "EUR",
		isIncluded: false,
		isNegotiable: false,
		localePrice: "",
		paymentFrequency: "monthly",
	},
	rentType: "room",
	rules: {
		childrenAllowed: true,
		coupleAllowed: true,
		guestsAllowed: true,
		partiesAllowed: true,
		petsAllowed: true,
		smokingAllowed: true,
	},
	status: "available",
	timings: {
		availableFrom: new Date().toISOString(),
		availableUntil: undefined,
		maximumStay: undefined,
		minimumStay: {
			unit: "month",
			value: 1,
		},
	},
	title: "",
	whoIsLiving: {
		currentTenants: {
			female: null as unknown as number,
			male: null as unknown as number,
			other: null as unknown as number,
		},
		ownerLivesHere: false,
	},
};
