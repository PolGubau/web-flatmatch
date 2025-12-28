import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { useCallback, useState } from "react";
import { RENT_TYPES } from "~/features/publish-room/ui/1-type/step";
import {
	DEFAULT_FILTER_VALUES,
	useFilters,
} from "~/features/room/model/hooks/use-filters";
import { Button } from "~/shared/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/shared/components/ui/collapsible";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { NumberInput } from "~/shared/components/ui/input/number-input";
import type { RentType } from "~/shared/types/common";
import type { AmenityKey } from "../../../model/constants/filter-amenities";
import { AmenitiesFilter } from "./amenities-filter";
import { OptionList } from "./options-list/list";

export const availableLocations = [
	"barcelona",
	"girona",
	"tarragona",
	"lleida",
	"milano",
	"roma",
] as const;
export type Location = (typeof availableLocations)[number];

export type Filters = {
	location: Location | null;
	minPrice: number | null;
	maxPrice: number | null;
	afterDate: Date | null;
	rentType: RentType | null;
	// Amenidades
	hasWifi: boolean | null;
	hasAirConditioning: boolean | null;
	hasHeating: boolean | null;
	hasLaundry: boolean | null;
	hasElevator: boolean | null;
	hasDishwasher: boolean | null;
	hasTV: boolean | null;
	hasParking: boolean | null;
	hasTerrace: boolean | null;
	hasBalcony: boolean | null;
	hasGarden: boolean | null;
	hasPool: boolean | null;
	hasPrivateBathroom: boolean | null;
	hasWorkingDesk: boolean | null;
	isFurnished: boolean | null;
	isWheelchairAccessible: boolean | null;
};

type Props = {
	onSubmit: (filters: Filters) => void;
};

export const FiltersForm = ({ onSubmit }: Props) => {
	const [filters, setFilters] = useFilters();

	const {
		minPrice: minPriceState,
		maxPrice: maxPriceState,
		location,
		afterDate,
		rentType,
		// Amenidades
		hasWifi,
		hasAirConditioning,
		hasHeating,
		hasLaundry,
		hasElevator,
		hasDishwasher,
		hasTV,
		hasParking,
		hasTerrace,
		hasBalcony,
		hasGarden,
		hasPool,
		hasPrivateBathroom,
		hasWorkingDesk,
		isFurnished,
		isWheelchairAccessible,
	} = filters ?? {};

	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		location,
	);
	const [selectedType, setSelectedType] = useState<RentType | null>(rentType);

	// Usar defaults si los valores son null
	const [minPrice, setMinPrice] = useState<number>(
		minPriceState ?? DEFAULT_FILTER_VALUES.minPrice,
	);
	const [maxPrice, setMaxPrice] = useState<number>(
		maxPriceState ?? DEFAULT_FILTER_VALUES.maxPrice,
	);

	// Estado local para amenidades
	const [selectedAmenities, setSelectedAmenities] = useState<
		Partial<Record<AmenityKey, boolean>>
	>({
		hasAirConditioning: hasAirConditioning ?? false,
		hasBalcony: hasBalcony ?? false,
		hasDishwasher: hasDishwasher ?? false,
		hasElevator: hasElevator ?? false,
		hasGarden: hasGarden ?? false,
		hasHeating: hasHeating ?? false,
		hasLaundry: hasLaundry ?? false,
		hasParking: hasParking ?? false,
		hasPool: hasPool ?? false,
		hasPrivateBathroom: hasPrivateBathroom ?? false,
		hasTerrace: hasTerrace ?? false,
		hasTV: hasTV ?? false,
		hasWifi: hasWifi ?? false,
		hasWorkingDesk: hasWorkingDesk ?? false,
		isFurnished: isFurnished ?? false,
		isWheelchairAccessible: isWheelchairAccessible ?? false,
	});

	const handleAmenityToggle = useCallback((amenity: AmenityKey, checked: boolean) => {
		setSelectedAmenities((prev) => ({ ...prev, [amenity]: checked }));
	}, []);

	const handleSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const afterDateValue = formData.get("afterDate") as string | null;

		const filters: Filters = {
			afterDate: afterDateValue ? new Date(afterDateValue) : null,
			hasAirConditioning: selectedAmenities.hasAirConditioning || null,
			hasBalcony: selectedAmenities.hasBalcony || null,
			hasDishwasher: selectedAmenities.hasDishwasher || null,
			hasElevator: selectedAmenities.hasElevator || null,
			hasGarden: selectedAmenities.hasGarden || null,
			hasHeating: selectedAmenities.hasHeating || null,
			hasLaundry: selectedAmenities.hasLaundry || null,
			hasParking: selectedAmenities.hasParking || null,
			hasPool: selectedAmenities.hasPool || null,
			hasPrivateBathroom: selectedAmenities.hasPrivateBathroom || null,
			hasTerrace: selectedAmenities.hasTerrace || null,
			hasTV: selectedAmenities.hasTV || null,
			// Amenidades
			hasWifi: selectedAmenities.hasWifi || null,
			hasWorkingDesk: selectedAmenities.hasWorkingDesk || null,
			isFurnished: selectedAmenities.isFurnished || null,
			isWheelchairAccessible: selectedAmenities.isWheelchairAccessible || null,
			location: selectedLocation,
			// Solo agregar a URL si difieren de los defaults
			maxPrice: maxPrice === DEFAULT_FILTER_VALUES.maxPrice ? null : maxPrice,
			minPrice: minPrice === DEFAULT_FILTER_VALUES.minPrice ? null : minPrice,
			rentType: selectedType,
		};
		onSubmit(filters);
		setFilters(filters);
	}, [selectedLocation, selectedType, minPrice, maxPrice, selectedAmenities, onSubmit, setFilters]);

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<fieldset>
				<legend>{t("location")}</legend>
				<OptionList
					name="location"
					onSelectOption={setSelectedLocation}
					options={availableLocations.map((location) => ({
						label: location,
						value: location,
					}))}
					selectedOption={selectedLocation}
				/>
			</fieldset>

			<fieldset>
				<legend>{t("price_range")}</legend>
				<div className="grid gap-4 md:grid-cols-2">
					<NumberInput
						defaultValue={minPrice}
						label={"min_price"}
						max={maxPrice ?? undefined}
						name="minPrice"
						onValueChange={setMinPrice}
						placeholder={t("any")}
						step={50}
					/>
					<NumberInput
						defaultValue={maxPrice}
						label={"max_price"}
						min={minPrice ?? undefined}
						name="maxPrice"
						onValueChange={setMaxPrice}
						placeholder={t("any")}
						step={50}
					/>
				</div>
			</fieldset>
			<fieldset>
				<legend>{t("when_do_you_want_to_move")}</legend>
				<div className="grid gap-4 md:grid-cols-2">
					<DatePicker
						defaultIsoValue={afterDate?.toISOString()}
						label={"after_date"}
						name="afterDate"
					/>
				</div>
			</fieldset>
			<fieldset>
				<legend>{t("type")}</legend>
				<OptionList
					name="type"
					onSelectOption={setSelectedType}
					options={RENT_TYPES.map((rentType) => ({
						label: rentType.label,
						value: rentType.value,
					}))}
					selectedOption={selectedType}
				/>
			</fieldset>

			{/* Amenidades con collapsible */}
			<Collapsible>
				<CollapsibleTrigger asChild>
					<Button
						className="w-full justify-between"
						type="button"
						variant="outline"
					>
						<span>{t("amenities")}</span>
						<span className="text-xs text-muted-foreground">
							{Object.values(selectedAmenities).filter(Boolean).length}{" "}
							{t("selected")}
						</span>
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="pt-4">
					<AmenitiesFilter
						onAmenityToggle={handleAmenityToggle}
						selectedAmenities={selectedAmenities}
					/>
				</CollapsibleContent>
			</Collapsible>

			{/*  */}
			<footer className="w-full flex justify-end">
				<Button type="submit">
					{t("apply")}
					<HugeiconsIcon icon={FilterIcon} size={16} strokeWidth={3} />
				</Button>
			</footer>
		</form>
	);
};
