import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { Button } from "~/shared/components/ui/button";

interface ErrorSectionProps {
  onReset: () => void;
  error?: Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  titleKey?: string;
  descriptionKey?: string;
}

/**
 * Componente genérico para mostrar errores con retry.
 * Reemplaza los componentes duplicados ProfileErrorFallback y RoomErrorFallback.
 */
export const ErrorSection = ({
  onReset,
  error,
  icon,
  titleKey = "something_went_wrong",
  descriptionKey = "error_boundary_default_message",
}: ErrorSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-8">
      {icon && (
        <HugeiconsIcon
          className="text-destructive opacity-80"
          icon={icon}
          size={64}
        />
      )}
      <div className="flex flex-col gap-2 text-center max-w-md">
        <h2 className="text-2xl font-semibold text-foreground">
          {/* @ts-expect-error - dynamic translation key */}
          {t(titleKey)}
        </h2>
        <p className="text-foreground/70">
          {/* @ts-expect-error - dynamic translation key */}
          {error?.message || t(descriptionKey)}
        </p>
      </div>
      <Button onClick={onReset} variant="default">
        <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={16} />
        {t("retry")}
      </Button>
    </div>
  );
};
