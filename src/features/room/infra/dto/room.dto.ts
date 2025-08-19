export interface RoomDto {
	// Metadata about a room
	id: string;
	title: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;

	rentType: "room" | "shared" | "entire";

	// Location details
	location: {
		address: string;
		city: string;
		country: string;
		postalCode?: string;
		lat: number;
		lng: number;
	};

	// Pricing details
	price: {
		amount: number;
		currency: string;
		paymentFrequency: "monthly" | "weekly" | "daily"; // How often the rent is paid
		isIncluded: boolean; // Are utilities included in the rent
		isNegotiable: boolean; // Is the price negotiable
		additionalCosts: {
			utilities: number; // Monthly cost for utilities
			deposit: number; // Security deposit amount
			otherFees?: number; // Any other fees (optional)
		};
	};

	// Room commodities
	commodities: Commodities;

	rules: {
		petsAllowed: boolean;
		smokingAllowed: boolean;
		guestsAllowed: boolean;
		coupleAllowed: boolean;
		childrenAllowed: boolean;
		partiesAllowed: boolean;
		quietHours:
			| false
			| {
					from: string; // e.g., "22:00"
					to: string; // e.g., "08:00"
			  };
	};

	images: {
		main: string; // URL of the main image
		gallery: string[]; // Array of URLs for additional images
	};

	// Timings
	timings: {
		availableFrom: Date; // When the room is available from
		availableUntil?: Date; // When the room is available until (optional)
		minimumStay: {
			unit: "day" | "week" | "month" | "year"; // Unit of minimum stay
			value: number; // Number of units
		};
		maximumStay:
			| undefined
			| {
					unit: "day" | "week" | "month" | "year"; // Unit of maximum stay
					value: number; // Number of units
			  };
	};

	// Who is living
	whoIsLiving: {
		ownerLivesHere: boolean; // Does the owner live in the property
		currentTenants: {
			male: number;
			female: number;
			other: number;
		};
	};
	// Contact details
	contact: {
		owner: {
			name: string; // Owner's name
			phone: string; // Owner's phone number
			email: string; // Owner's email address
		};
		agent?: {
			name: string; // Agent's name (if applicable)
			phone: string; // Agent's phone number
			email: string; // Agent's email address
		};
	};

	// Additional metadata
	isVerified:
		| false
		| {
				date: Date; // When the room was verified
		  };

	status: "available" | "booked" | "unlisted";

	// preferences

	preferences: {
		gender: {
			male: boolean;
			female: boolean;
			other: boolean;
		};
		age: {
			min: number; // Minimum age of preferred tenant
			max: number; // Maximum age of preferred tenant
		};
		currentOccupation: {
			student: boolean;
			employed: boolean;
			unemployed: boolean;
			other: boolean;
		};
	};
}

export interface Commodities {
	shared?: {
		hasWifi: boolean;
		hasKitchen: boolean;
		hasHeating: boolean;
		hasAirConditioning: boolean;
		hasLaundry: boolean;
		hasElevator: boolean;
		isWheelchairAccessible: boolean;
	};

	whole: {
		area: {
			value: number;
			unit: "m2";
		};
		bedrooms: {
			individual: number;
			shared: number;
		};
		bathrooms: number;
		extras: {
			hasParking: boolean;
			hasPool: boolean;
			hasGarden: boolean;
			hasTerrace: boolean;
		};
		appliances: {
			hasTV: boolean;
			hasWashingMachine: boolean;
			hasDryer: boolean;
			hasDishwasher: boolean;
			hasMicrowave: boolean;
			hasRefrigerator: boolean;
			hasOven: boolean;
			hasCoffeeMaker: boolean;
		};
		areUtilitiesIncluded: boolean;
	};

	room?: {
		area: number; // m² habitación
		bedType: "single" | "double" | "bunk" | "sofa" | "none";
		hasWindow: boolean;
		hasBalcony: boolean;
		isFurnished: boolean;
		hasPrivateBathroom: boolean;
		hasWorkingDesk: boolean;
	};
}
