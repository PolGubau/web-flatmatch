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
import { useHapticFeedback } from "~/shared/hooks/use-haptic-feedback";
import { useRateLimit } from "~/shared/hooks/use-rate-limit";

type SwipeActionsProps = {
  onSwipe: (direction: SwipeDirection) => void;
  disabled?: boolean;
};

export const SwipeActions = ({
  onSwipe,
  disabled = false,
}: SwipeActionsProps) => {
  const { t } = useTranslation();
  const triggerHaptic = useHapticFeedback();
  const checkRateLimit = useRateLimit(10, 1000); // Max 10 swipes per second

  const handleSwipe = (direction: SwipeDirection) => {
    if (!checkRateLimit(false)) return;
    triggerHaptic("light");
    onSwipe(direction);
  };

  return (
    <nav className="flex gap-2 justify-between mx-auto w-[85vw] max-w-lg relative z-20">
      {/* Reject - Left Arrow or A */}
      <Tooltip
        label={
          <div className="flex items-center gap-2">
            {t("reject")} <Kbd>A</Kbd> / <Kbd>←</Kbd>
          </div>
        }
      >
        <div>
          <Button
            aria-label={t("reject")}
            className="bg-destructive/10 size-12 md:size-14 backdrop-blur-md"
            disabled={disabled}
            onClick={() => handleSwipe("left")}
            size={"icon-lg"}
            variant={"ghost"}
          >
            <HugeiconsIcon aria-hidden="true" icon={ArrowLeft01Icon} size={25} />
            <span className="sr-only">{t("reject")}</span>
          </Button>
        </div>
      </Tooltip>

      {/* See Details - Up Arrow or W */}
      <Button
        aria-label={t("see_details")}
        className="min-w-12 h-12 md:min-w-14 md:h-14 flex-1"
        disabled={disabled}
        onClick={() => handleSwipe("up")}
        title="See details (↑ or W)"
        variant={"secondary"}
      >
        <HugeiconsIcon aria-hidden="true" icon={ArrowUp01Icon} />
        <span className="max-sm:hidden">{t("see_details")}</span>
      </Button>

      <FiltersModal />

      {/* Like - Right Arrow or D */}
      <Tooltip
        aria-label={t("like")}
        label={
          <div className="flex items-center gap-2">
            {t("like")} <Kbd>D</Kbd> / <Kbd>→</Kbd>
          </div>
        }
      >
        <div>
          <Button
            className="bg-green-500/20 size-12 md:size-14 backdrop-blur-md"
            disabled={disabled}
            onClick={() => handleSwipe("right")}
            size={"icon-lg"}
            title="Like (→ or D)"
            variant={"ghost"}
          >
            <HugeiconsIcon aria-hidden="true" icon={ArrowRight01Icon} />
            <span className="sr-only">{t("like")}</span>
          </Button>
        </div>
      </Tooltip>
    </nav>
  );
};
