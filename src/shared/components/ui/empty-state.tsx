import type { Alert01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { Button } from "~/shared/components/ui/button";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";

interface EmptyStateProps {
  title: TranslationKey;
  description: TranslationKey;
  icon?: typeof Alert01Icon;
  action?: {
    label: TranslationKey;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8 text-center min-h-[300px]",
        className,
      )}
    >
      {icon && (
        <HugeiconsIcon className="text-foreground/30" icon={icon} size={64} />
      )}
      <div className="flex flex-col gap-2 max-w-md">
        <h3 className="text-xl font-semibold text-foreground">{t(title)}</h3>
        <p className="text-foreground/70">{t(description)}</p>
      </div>
      {action && (
        <Button onClick={action.onClick} variant="default">
          {t(action.label)}
        </Button>
      )}
    </div>
  );
};
