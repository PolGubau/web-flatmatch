import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AutoComplete } from "~/shared/components/ui/autocomplete";
import { useDebounce } from "~/shared/hooks/use-debounce";

type StreetRef = {
	name: string;
	lat: number;
	lon: number;
	city: string;
	postcode: string;
	country: string;
};

interface OpenDirection {
	place_id: number;
	lat: string;
	lon: string;
	display_name: string;
	address: {
		city?: string;
		county?: string;
		postcode?: string;
		country?: string;
	};
}

const fetchPredictions = async (value: string): Promise<StreetRef[]> => {
	if (value.length < 3) return [];
	const res = await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
			value,
		)}`,
	);
	const data = (await res.json()) as OpenDirection[];

	return data.map((item) => ({
		city: item.address.city || item.address.county || "",
		country: item.address.country || "",
		lat: Number(item.lat),
		lon: Number(item.lon),
		name: item.display_name,
		postcode: item.address.postcode || "",
	}));
};

type StreetAutocompleteProps = {
	value?: string;
	onChange?: (value: StreetRef) => void;
	field: UseFormRegisterReturn<string>;
};

/**
 * Autocomplete de calles (Nominatim + React Query + Debounce)
 */
export function StreetAutocomplete({ value = "", onChange, field }: StreetAutocompleteProps) {
	const { t } = useTranslation();
	const [query, setQuery] = useState<string>(value);
	const [selectedValue, setSelectedValue] = useState<string>("");

	useEffect(() => {
		setQuery(value);
		setSelectedValue(value);
	}, [value]);

	const debouncedQuery = useDebounce(query, 400);

	const { data, isLoading } = useQuery({
		enabled: debouncedQuery.length >= 3, // evita llamadas si hay poco texto
		queryFn: () => fetchPredictions(debouncedQuery),
		queryKey: ["streets", debouncedQuery],
		staleTime: 1000 * 60, // cache 1 min para no repetir llamadas
	});

	const handleSelectedPlace = (name: string) => {
		const selectedStreet = data?.find((d) => d.name === name);
		if (selectedStreet) {
			setQuery(selectedStreet.name);
			setSelectedValue(selectedStreet.name);
			onChange?.(selectedStreet);
		}
	};

	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm" htmlFor="location.address">
				{t("address")}
			</label>
			<AutoComplete
				{...field}
				emptyMessage={
					query.length < 3 ? "Escribe al menos 3 caracteres" : "No se encontraron resultados"
				}
				id="location.address"
				isLoading={isLoading}
				items={data?.map((d) => ({ label: d.name, value: d.name })) ?? []}
				onSearchValueChange={setQuery}
				onSelectedValueChange={handleSelectedPlace}
				placeholder="Busca una dirección..."
				searchValue={query}
				selectedValue={selectedValue}
			/>
		</div>
	);
}
