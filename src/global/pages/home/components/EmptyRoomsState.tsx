import { RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { Button } from "~/shared/components/ui/button";

type EmptyRoomsStateProps = {
  onRefetch: () => void;
  isLoading?: boolean;
};

export const EmptyRoomsState = ({
  onRefetch,
  isLoading = false,
}: EmptyRoomsStateProps) => {
  const { t } = useTranslation();

  return (
    <div className="text-center form text-foreground/60 max-w-md items-center">
      {t("there_are_no_more_rooms")}
      <Button className="group" disabled={isLoading} onClick={onRefetch}>
        <HugeiconsIcon
          className="group-focus:rotate-180 transition-all"
          icon={RefreshIcon}
          size={16}
          strokeWidth={3}
        />
        {t("reload")}
      </Button>
    </div>
  );
};
