import type { EditableRoom } from "./editable-room";

export const emptyEditableRoom: EditableRoom = {
	commodities: {
		room: undefined,
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
			area: 0,
			areUtilitiesIncluded: false,
			bathrooms: 0,
			bedrooms: {
				individual: 0,
				shared: 0,
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
		gallery: [],
		main: "",
	},
	isVerified: false,
	location: {
		address: "",
		city: "bcn",
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
		amount: 0,
		currency: "",
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
		quietHours: false,
		smokingAllowed: true,
	},
	status: "available",
	timings: {
		availableFrom: new Date(),
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
			female: 0,
			male: 0,
			other: 0,
		},
		ownerLivesHere: false,
	},
};
