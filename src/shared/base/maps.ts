import {
	Backpack01Icon,
	BeachIcon,
	CarParking02Icon,
	Coffee02Icon,
	DishWasherIcon,
	FastWindIcon,
	FemaleSymbolIcon,
	HairDryerIcon,
	HelpSquareIcon,
	MaleSymbolIcon,
	MicrowaveIcon,
	OfficeChairIcon,
	OvenIcon,
	PoolIcon,
	PulleyIcon,
	RefrigeratorIcon,
	Shirt01Icon,
	TemperatureIcon,
	TerraceIcon,
	Tree04Icon,
	Tv01Icon,
	User02Icon,
	WheelchairIcon,
	Wifi02Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { Room } from "~/entities/room/room";
import type { TranslationKey } from "../i18n/i18n";
import type { Gender } from "../types/common";

type MapItem = {
	label: TranslationKey;
	icon?: IconSvgElement;
};

export const extrasMap: Record<
	keyof Room["commodities"]["whole"]["extras"],
	MapItem
> = {
	hasGarden: {
		icon: Tree04Icon,
		label: "garden",
	},
	hasParking: {
		icon: CarParking02Icon,
		label: "parking",
	},
	hasPool: {
		icon: PoolIcon,
		label: "pool",
	},
	hasTerrace: {
		icon: TerraceIcon,
		label: "terrace",
	},
};

export const commoditiesMap: Record<
	keyof Room["commodities"]["whole"]["appliances"],
	MapItem
> = {
	hasAirConditioning: {
		icon: FastWindIcon,
		label: "air_conditioning",
	},
	hasCoffeeMaker: {
		icon: Coffee02Icon,
		label: "coffee_maker",
	},
	hasDishwasher: {
		icon: DishWasherIcon,
		label: "dishwasher",
	},
	hasDryer: {
		icon: HairDryerIcon,
		label: "dryer",
	},
	hasElevator: {
		icon: PulleyIcon,
		label: "elevator",
	},
	hasHeating: {
		icon: TemperatureIcon,
		label: "heating",
	},
	hasLaundry: {
		icon: Shirt01Icon,
		label: "washing_machine",
	},
	hasMicrowave: {
		icon: MicrowaveIcon,
		label: "microwave",
	},
	hasOven: {
		icon: OvenIcon,
		label: "oven",
	},
	hasRefrigerator: {
		icon: RefrigeratorIcon,
		label: "refrigerator",
	},
	hasTV: {
		icon: Tv01Icon,
		label: "tv",
	},

	hasWifi: {
		icon: Wifi02Icon,
		label: "wifi",
	},
	isWheelchairAccessible: {
		icon: WheelchairIcon,
		label: "wheelchair_accessible",
	},
};

export const occupationMap: Record<string, MapItem> = {
	employed: {
		icon: OfficeChairIcon,
		label: "employed",
	},
	student: {
		icon: Backpack01Icon,
		label: "student",
	},
	unemployed: {
		icon: BeachIcon,
		label: "unemployed",
	},
};

export const genderMap: Record<Gender, MapItem> = {
	female: {
		icon: FemaleSymbolIcon,
		label: "female",
	},
	male: {
		icon: MaleSymbolIcon,
		label: "male",
	},
	non_binary: {
		icon: User02Icon,
		label: "non_binary",
	},
	prefer_not_to_say: {
		icon: User02Icon,
		label: "prefer_not_to_say",
	},
};

type BoolRulesKey = keyof Omit<Room["rules"], "quietHours">;
export const boolRulesMap: Record<BoolRulesKey, MapItem> = {
	childrenAllowed: {
		icon: BeachIcon,
		label: "children_allowed",
	},
	coupleAllowed: {
		icon: TemperatureIcon,
		label: "couple_allowed",
	},
	guestsAllowed: {
		icon: HelpSquareIcon,
		label: "guests_allowed",
	},
	partiesAllowed: {
		icon: FastWindIcon,
		label: "parties_allowed",
	},
	petsAllowed: {
		icon: Shirt01Icon,
		label: "pets_allowed",
	},
	smokingAllowed: {
		icon: Coffee02Icon,
		label: "smoking_allowed",
	},
};
