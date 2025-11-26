import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { useState } from "react";
import { useFilters } from "~/features/room/model/hooks/use-filters";
import { Button } from "~/shared/components/ui/button";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { Input } from "~/shared/components/ui/input/input";
import { cn } from "~/shared/utils/utils";

export const availableLocations = [
	"Barcelona",
	"Girona",
	"Tarragona",
	"Lleida",
	"Milano",
	"Roma",
] as const;
export type Location = (typeof availableLocations)[number];

export type Filters = {
	location: Location | null;
	minPrice: number | null;
	maxPrice: number | null;
	afterDate: Date | null;
};

type Props = {
	onSubmit: (filters: Filters) => void;
};

export const FiltersForm = ({ onSubmit }: Props) => {
	const [filters, setFilters] = useFilters();

	const {
		minPrice,
		maxPrice,
		location: rawLocation,
		afterDate,
	} = filters ?? {};
	const location = rawLocation as Location | null;
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		location ?? null,
	);
	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const minPriceValue = formData.get("minPrice");
		const maxPriceValue = formData.get("maxPrice");
		const afterDateValue = formData.get("afterDate");

		const filters: Filters = {
			afterDate: afterDateValue ? new Date(afterDateValue as string) : null,
			location: selectedLocation,
			maxPrice: maxPriceValue ? Number(maxPriceValue) : null,
			minPrice: minPriceValue ? Number(minPriceValue) : null,
		};
		onSubmit(filters);
		setFilters(filters);
	}

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<fieldset>
				<legend>{t("location")}</legend>
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
					{availableLocations.map((av_location) => {
						const isChecked = av_location === selectedLocation;
						function toggleThisLocation() {
							if (isChecked) {
								setSelectedLocation(null);
								return;
							}
							setSelectedLocation(av_location);
						}

						return (
							<li className="w-full h-full" key={av_location}>
								<button
									className={cn(
										"p-4 transition-all w-full h-full  rounded-xl outline-none flex items-center justify-center font-medium text-sm md:text-base hover:scale-[1.03] focus:scale-[1.03]",
										{
											" bg-foreground/10": !isChecked,
											"ring-2 ring-foreground bg-foreground/20": isChecked,
										},
									)}
									onClick={toggleThisLocation}
									type="button"
								>
									<input
										checked={isChecked}
										defaultValue={av_location}
										hidden
										id={av_location}
										name="av_location"
										type="radio"
									/>
									<span className="capitalize">{av_location}</span>
								</button>
							</li>
						);
					})}
				</ul>
			</fieldset>

			<fieldset>
				<legend>{t("price_range")}</legend>
				<div className="grid gap-4 md:grid-cols-2">
					<Input
						defaultValue={minPrice ?? ""}
						label={"min_price"}
						name="minPrice"
						placeholder={t("any")}
						type="number"
					/>
					<Input
						defaultValue={maxPrice ?? ""}
						label={"max_price"}
						name="maxPrice"
						placeholder={t("any")}
						type="number"
					/>
				</div>
			</fieldset>
			<fieldset>
				<legend>{t("when_do_you_want_to_move")}</legend>
				<div className="grid gap-4 md:grid-cols-2">
					<DatePicker
						defaultIsoValue={afterDate?.toISOString() ?? null}
						label={"after_date"}
						name="afterDate"
					/>
				</div>
			</fieldset>
			<footer className="w-full flex justify-end">
				<Button type="submit">
					{t("apply")}
					<HugeiconsIcon icon={FilterIcon} size={16} strokeWidth={3} />
				</Button>
			</footer>
		</form>
	);
};
