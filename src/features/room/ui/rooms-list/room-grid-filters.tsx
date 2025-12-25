import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  CalendarIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/components/ui/select";

export type SortOption = "price-asc" | "price-desc" | "date-desc" | "date-asc";

type RoomGridFiltersProps = {
  onSortChange: (sort: SortOption) => void;
  currentSort: SortOption;
  totalCount: number;
};

export const RoomGridFilters = ({
  onSortChange,
  currentSort,
  totalCount,
}: RoomGridFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <p className="text-sm text-muted-foreground">
        {totalCount} {totalCount === 1 ? t("room") : t("room")}
      </p>

      <Select
        onChange={(value) => onSortChange(value as SortOption)}
        options={[
          { label: "most_recent", value: "date-desc" },
          { label: "older", value: "date-asc" },
          { label: "price_asc", value: "price-asc" },
          { label: "price_desc", value: "price-desc" },
        ]}
        value={currentSort}
      />
    </div>
  );
};
