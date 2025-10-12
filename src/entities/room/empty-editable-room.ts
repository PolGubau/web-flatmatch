import type { EditableRoom } from "./editable-room";

export const emptyEditableRoom: EditableRoom = {
	commodities: {
		room: {
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
			min: 18,
		},
		currentOccupation: {
			employed: true,
			student: true,
			unemployed: true,
		},
		gender: {
			female: true,
			male: true,
			non_binary: true,
			prefer_not_to_say: true,
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
		paymentFrequency: "monthly",
	},
	rentType: "private-room",
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
			female: 0,
			male: 0,
			other: 0,
		},
		ownerLivesHere: false,
	},
};
