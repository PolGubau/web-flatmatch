import {
  BedDoubleIcon,
  Sink01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";

type QuickStatsCardProps = {
  bedrooms: number;
  bathrooms: number;
  roommates: number;
};

export const QuickStatsCard = ({
  bedrooms,
  bathrooms,
  roommates,
}: QuickStatsCardProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <HugeiconsIcon
              className="text-primary"
              icon={BedDoubleIcon}
              size={28}
            />
            <span className="text-sm font-medium">
              {t("x_bedrooms", { count: bedrooms })}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <HugeiconsIcon
              className="text-primary"
              icon={Sink01Icon}
              size={28}
            />
            <span className="text-sm font-medium">
              {t("x_bathrooms", { count: bathrooms })}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <HugeiconsIcon
              className="text-primary"
              icon={UserGroupIcon}
              size={28}
            />
            <span className="text-sm font-medium">
              {t("roommates", { count: roommates })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
