import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { useState } from "react";
import { RENT_TYPES } from "~/features/publish-room/ui/1-type/step";
import { useFilters } from "~/features/room/model/hooks/use-filters";
import { Button } from "~/shared/components/ui/button";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { Input } from "~/shared/components/ui/input/input";
import { NumberInput } from "~/shared/components/ui/input/number-input";
import type { RentType } from "~/shared/types/common";
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
	} = filters ?? {};
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		location,
	);
	const [selectedType, setSelectedType] = useState<RentType | null>(rentType);

	const [minPrice, setMinPrice] = useState<number>(minPriceState);
	const [maxPrice, setMaxPrice] = useState<number>(maxPriceState);

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const afterDateValue = formData.get("afterDate");

		const filters: Filters = {
			afterDate: afterDateValue ? new Date(afterDateValue as string) : null,
			location: selectedLocation,
			maxPrice,
			minPrice,
			rentType: selectedType,
		};
		onSubmit(filters);
		setFilters(filters);
	}

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
