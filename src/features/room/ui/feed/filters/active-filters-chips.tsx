import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { DEFAULT_FILTER_VALUES } from "~/features/room/model/hooks/use-filters";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import type { Filters } from "./filters-form";

interface ActiveFiltersChipsProps {
  filters: Partial<Filters>;
  onRemoveFilter: (key: keyof Filters) => void;
  onClearAll: () => void;
  resultsCount?: number;
  totalCount?: number;
}

/**
 * Chips removibles que muestran los filtros activos y contador de resultados
 */
export const ActiveFiltersChips = ({
  filters,
  onRemoveFilter,
  onClearAll,
  resultsCount,
  totalCount,
}: ActiveFiltersChipsProps) => {
  const { t } = useTranslation();

  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    // Excluir null, undefined, false
    if (value === null || value === undefined || value === false) return false;

    // Excluir valores por defecto
    if (key === "minPrice" && value === DEFAULT_FILTER_VALUES.minPrice) return false;
    if (key === "maxPrice" && value === DEFAULT_FILTER_VALUES.maxPrice) return false;

    return true;
  });

  if (activeFilters.length === 0) return null; const getFilterLabel = (key: string, value: unknown): string => {
    // @ts-expect-error - dynamic translation key
    if (typeof value === "boolean") return t(key);
    // @ts-expect-error - dynamic translation key
    if (key === "minPrice") return `${t("min")}: ${value}€`;
    // @ts-expect-error - dynamic translation key
    if (key === "maxPrice") return `${t("max")}: ${value}€`;
    if (key === "afterDate")
      // @ts-expect-error - dynamic translation key
      return `${t("from")}: ${new Date(value as string).toLocaleDateString()}`;
    // @ts-expect-error - dynamic translation key
    if (key === "location" || key === "rentType") return t(value as string);
    return String(value);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-muted/30 rounded-lg">
      {/* Contador de resultados */}
      {resultsCount !== undefined && (
        <div className="text-sm text-foreground/70">
          {totalCount !== undefined ? (
            <span>
              {t("showing_x_of_y_rooms", { count: resultsCount, total: totalCount })}
            </span>
          ) : (
            <span>
              <strong>{resultsCount}</strong>{" "}
              {t("rooms_found")}
            </span>
          )}
        </div>
      )}

      {/* Chips de filtros activos */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium">{t("active_filters")}:</span>
        {activeFilters.map(([key, value]) => (
          <Badge
            className="gap-1 cursor-pointer hover:bg-destructive/20"
            key={key}
            onClick={() => onRemoveFilter(key as keyof Filters)}
            variant="secondary"
          >
            {getFilterLabel(key, value)}
            <HugeiconsIcon icon={Cancel01Icon} size={14} />
          </Badge>
        ))}
        <Button className="ml-2" onClick={onClearAll} size="sm" variant="ghost">
          {t("clear_all")}
        </Button>
      </div>
    </div>
  );
};
