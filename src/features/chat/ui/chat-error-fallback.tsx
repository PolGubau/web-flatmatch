import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MessageCircleX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "~/shared/components/ui/button";

interface ChatErrorFallbackProps {
  onReset: () => void;
  error?: Error;
}

export const ChatErrorFallback = ({ onReset, error }: ChatErrorFallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
      <MessageCircleX
        className="text-destructive opacity-80"
        size={64}
      />
      <div className="flex flex-col gap-2 text-center max-w-md">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("chat_error_title")}
        </h2>
        <p className="text-foreground/70">
          {error?.message || t("chat_error_description")}
        </p>
      </div>
      <Button onClick={onReset} variant="default">
        <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={16} />
        {t("retry")}
      </Button>
    </div>
  );
};
