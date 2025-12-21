import { SecurityCheckIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { RoomWithMetadata } from "~/entities/room/room";
import { Badge } from "~/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";
import { ContactButtons } from "../footer/contact-buttons";
import { getRentTypeLabel } from "../utils/room-details.utils";
import { RoomActionsBar } from "./RoomActionsBar";

type RoomHeaderCardProps = {
  room: RoomWithMetadata;
  formattedPrice: string;
  isFavourite: boolean;
  isSharing: boolean;
  onShare: () => void;
  onChat: () => void;
  onFavouriteToggle: () => void;
};

export const RoomHeaderCard = ({
  room,
  formattedPrice,
  isFavourite,
  isSharing,
  onShare,
  onChat,
  onFavouriteToggle,
}: RoomHeaderCardProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl mb-2">{room.title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="text-base" variant="secondary">
                {formattedPrice} / {room.price.paymentFrequency}
              </Badge>
              <Badge variant="outline">
                {t(getRentTypeLabel(room.rentType))}
              </Badge>
              {room.verification.verifiedAt && (
                <Badge className="gap-1" variant="success">
                  <HugeiconsIcon icon={SecurityCheckIcon} size={14} />
                  {t("verified")}
                </Badge>
              )}
            </div>
          </div>
          <RoomActionsBar
            isFavourite={isFavourite}
            isSharing={isSharing}
            onChat={onChat}
            onFavouriteToggle={onFavouriteToggle}
            onShare={onShare}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ContactButtons
          email={room.contact.agent?.email ?? room.contact.owner?.email}
          infoMessage={t("contact_message", {
            name: room.title,
          })}
          phone={room.contact.agent?.phone ?? room.contact.owner?.phone}
        />
      </CardContent>
    </Card>
  );
};
