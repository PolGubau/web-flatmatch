import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { SwipeDirection } from "~/features/room/types/common";
import { FiltersModal } from "~/features/room/ui/feed/filters/filters-modal";
import { Button } from "~/shared/components/ui/button";
import { Kbd } from "~/shared/components/ui/kbd";
import { Tooltip } from "~/shared/components/ui/tooltip";

type SwipeActionsProps = {
  onSwipe: (direction: SwipeDirection) => void;
  disabled?: boolean;
};

export const SwipeActions = ({ onSwipe, disabled = false }: SwipeActionsProps) => {
  const { t } = useTranslation();

  return (
    <nav className="flex gap-2 justify-between mx-auto w-[80vw] max-w-lg relative z-20">
      {/* Reject - Left Arrow or A */}
      <Tooltip label={
        <div className="flex items-center gap-2">
          {t("reject")} <Kbd>A</Kbd> / <Kbd>←</Kbd>
        </div>
      }>
        <Button
          className="bg-destructive/10 size-14"
          disabled={disabled}
          onClick={() => onSwipe("left")}
          size={"icon-lg"}

          variant={"ghost"}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={25} />
        </Button>
      </Tooltip>

      {/* See Details - Up Arrow or W */}
      <Button
        className="min-w-14 h-14 flex-1"
        disabled={disabled}
        onClick={() => onSwipe("up")}
        title="See details (↑ or W)"
        variant={"secondary"}
      >
        <HugeiconsIcon icon={ArrowUp01Icon} />
        <span className="max-sm:hidden">{t("see_details")}</span>
      </Button>

      <FiltersModal />

      {/* Like - Right Arrow or D */}
      <Tooltip label={
        <div className="flex items-center gap-2">
          {t("like")} <Kbd>D</Kbd> / <Kbd>→</Kbd>
        </div>
      }>
        <Button
          className="bg-green-500/20 size-14"
          disabled={disabled}
          onClick={() => onSwipe("right")}
          size={"icon-lg"}
          title="Like (→ or D)"
          variant={"ghost"}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </Tooltip>
    </nav>
  );
};
