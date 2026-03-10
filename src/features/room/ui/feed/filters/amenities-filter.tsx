import { useTranslation } from "react-i18next";
import { Checkbox } from "~/shared/components/ui/checkbox";
import { Label } from "~/shared/components/ui/label";
import {
	AMENITY_GROUPS,
	type AmenityKey,
	FILTERABLE_AMENITIES,
} from "../../../model/constants/filter-amenities";

interface AmenitiesFilterProps {
	selectedAmenities: Partial<Record<AmenityKey, boolean>>;
	onAmenityToggle: (amenity: AmenityKey, checked: boolean) => void;
} /**
 * Componente para filtrar por amenidades agrupadas por categoría
 */
export const AmenitiesFilter = ({
	selectedAmenities,
	onAmenityToggle,
}: AmenitiesFilterProps) => {
	const { t } = useTranslation();

	const amenityGroups = [
		{
			amenities: AMENITY_GROUPS.appliances,
			key: "appliances",
			label: "commodities",
		},
		{ amenities: AMENITY_GROUPS.extras, key: "extras", label: "extras" },
		{ amenities: AMENITY_GROUPS.room, key: "room", label: "room_features" },
		{
			amenities: AMENITY_GROUPS.accessibility,
			key: "accessibility",
			label: "accessibility",
		},
	] as const;

	return (
		<div className="flex flex-col gap-4">
			{amenityGroups.map((group) => (
				<div className="flex flex-col gap-2" key={group.key}>
					<h4 className="text-sm font-medium text-foreground/70">
						{t(group.label)}
					</h4>
					<div className="grid grid-cols-2 gap-3">
						{group.amenities.map((amenity) => {

							const isChecked = selectedAmenities[amenity] ?? false;
							const label = t(FILTERABLE_AMENITIES[amenity]);
							function handleChange(checked: boolean | "indeterminate") {
								onAmenityToggle(amenity, checked === true);
							}

							return (
								<Label
									className="flex items-center gap-2 cursor-pointer"
									htmlFor={amenity}
									key={amenity}
								>
									<Checkbox
										checked={isChecked}
										id={amenity}
										onCheckedChange={handleChange}
									/>
									<span className="text-sm">
										{label}
									</span>
								</Label>
							)
						})}
					</div>
				</div>
			))}
		</div>
	);
};
