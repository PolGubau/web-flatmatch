import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useMemo, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { fetchPredictions } from "~/features/publish-room/infra/fetch-predictions";
import { FormFooterButtons } from "~/features/publish-room/ui/shared/form-footer-buttons";
import { AutoComplete } from "~/shared/components/ui/autocomplete";
import { useDebounce } from "~/shared/hooks/use-debounce";
import { Button } from "../button";
import { Drawer } from "../drawer";
import { Input } from "../input/input";

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
	const [selectedAddress, setSelectedAddress] = useState<StreetRef | null>(
		null,
	);

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
		setSelectedAddress(selectedStreet);
		console.log("Selected street:", selectedStreet);
		onSelect?.(selectedStreet);
		setQuery(selectedStreet.name); // actualizar query solo al seleccionar
	};

	const [openEditDrawer, setOpenEditDrawer] = useState(false);

	const handleOnSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const formData = new FormData(e.currentTarget);

		const newAddress: StreetRef = {
			...(selectedAddress as StreetRef),
			city: formData.get("city") as string,
			country: formData.get("country") as string,
			lat: Number(formData.get("lat")),
			lon: Number(formData.get("lon")),
			name: formData.get("address") as string,
			postcode: formData.get("postcode") as string,
		};
		setSelectedAddress(newAddress);
		console.log("Edited address:", newAddress);
		setSelectedValue(newAddress.name);
		onSelect?.(newAddress);
		setOpenEditDrawer(false);
	};

	return (
		<div className="flex flex-col gap-1">
			<Drawer
				description="Correct the address details if necessary"
				footer={
					<nav className="flex gap-2 items-center justify-end">
						<Button onClick={() => setOpenEditDrawer(false)} variant="ghost">
							{t("cancel")}
						</Button>
						<Button onClick={() => setOpenEditDrawer(false)} type="submit">
							{t("save")}
						</Button>
					</nav>
				}
				onOpenChange={setOpenEditDrawer}
				onSubmit={handleOnSubmitEdit}
				open={openEditDrawer}
				title="Edit Address"
			>
				<fieldset className="flex flex-col gap-4">
					<legend className="text-lg font-medium">{t("edit_address")}</legend>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Input
							defaultValue={selectedAddress?.name}
							label={"address"}
							name={"address"}
						/>
						<Input
							defaultValue={selectedAddress?.city}
							label={"city"}
							name={"city"}
						/>
						<Input
							defaultValue={selectedAddress?.postcode}
							label={"postcode"}
							name={"postcode"}
						/>
						<Input
							defaultValue={selectedAddress?.country}
							label={"country"}
							name={"country"}
						/>
						<Input
							defaultValue={selectedAddress?.lat}
							label={"latitude"}
							name={"lat"}
						/>
						<Input
							defaultValue={selectedAddress?.lon}
							label={"longitude"}
							name={"lon"}
						/>
					</div>
				</fieldset>
			</Drawer>
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
				rightContent={
					<Button
						disabled={!selectedAddress?.lat || !selectedAddress?.lon}
						onClick={() => setOpenEditDrawer(true)}
						size={"icon"}
						type="button"
						variant={"ghost"}
					>
						<Edit />
					</Button>
				}
				searchValue={query}
				selectedValue={selectedValue}
			/>
		</div>
	);
}
