import {
	CarParking02Icon,
	Coffee02Icon,
	DishWasherIcon,
	FastWindIcon,
	HairDryerIcon,
	MicrowaveIcon,
	OvenIcon,
	PoolIcon,
	PulleyIcon,
	RefrigeratorIcon,
	Shirt01Icon,
	TemperatureIcon,
	TerraceIcon,
	Tree04Icon,
	Tv01Icon,
	WheelchairIcon,
	Wifi02Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { Room } from "~/entities/room/room";
import type { TranslationKey } from "../i18n/i18n";
export const extrasMap: Record<string, { label: TranslationKey; icon: IconSvgElement }> = {
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
	{ label: TranslationKey; icon: IconSvgElement }
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
