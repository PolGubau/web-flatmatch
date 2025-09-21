import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AutoComplete } from "~/shared/components/ui/autocomplete";
import { useDebounce } from "~/shared/hooks/use-debounce";
import { fetchPredictions } from "../../infra/fetch-predictions";

export type StreetRef = {
	name: string;
	lat: number;
	lon: number;
	city: string;
	postcode: string;
	country: string;
};

type StreetAutocompleteProps = {
	value?: string;
	onSelect?: (value: StreetRef) => void;
	field: UseFormRegisterReturn<string>;
};

export function StreetAutocomplete({
	value = "",
	onSelect,
	field,
}: StreetAutocompleteProps) {
	const { t } = useTranslation();
	const [query, setQuery] = useState(value);
	const [selectedValue, setSelectedValue] = useState<string>("");

	const debouncedQuery = useDebounce(query, 500);

	const { data, isLoading } = useQuery({
		enabled: debouncedQuery.length >= 3,
		queryFn: () => fetchPredictions(debouncedQuery),
		queryKey: ["streets", debouncedQuery],
		staleTime: 1000 * 60,
	});

	const items = useMemo(
		() => data?.map((d) => ({ label: d.name, value: d.name })) ?? [],
		[data],
	);

	const handleSelectedPlace = (name: string) => {
		const selectedStreet = data?.find((d) => d.name === name);
		if (!selectedStreet) return;
		setSelectedValue(selectedStreet.name);
		onSelect?.(selectedStreet);
		setQuery(selectedStreet.name); // actualizar query solo al seleccionar
	};

	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm" htmlFor="location.address">
				{t("address")}
			</label>
			<AutoComplete
				{...field}
				emptyMessage={
					query.length < 3
						? "Escribe al menos 3 caracteres"
						: "No se encontraron resultados"
				}
				id="location.address"
				isLoading={isLoading}
				items={items}
				onSearchValueChange={setQuery}
				onSelectedValueChange={handleSelectedPlace}
				placeholder="where_is_your_room_located"
				searchValue={query}
				selectedValue={selectedValue}
			/>
		</div>
	);
}
