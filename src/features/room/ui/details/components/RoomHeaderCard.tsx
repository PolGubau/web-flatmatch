import { SecurityCheckIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { RoomWithMetadata } from "~/entities/room/room";
import { Badge } from "~/shared/components/ui/badge";
import { ContactButtons } from "../footer/contact-buttons";
import { useRoomDetailsData } from "../hooks/useRoomDetailsData";
import { getRentTypeLabel } from "../utils/room-details.utils";


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
}: RoomHeaderCardProps) => {
  const { t } = useTranslation();
  const {
    formattedPrice,
    roommatesData,
  } = useRoomDetailsData(room);
  return (
    <header className="flex flex-col gap-4 mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl mb-2 line-clamp-3">{room.title}</h1>
          <div className="flex md:items-center max-md:flex-col gap-2 flex-wrap md:divide-x divide-foreground/20 text-sm text-foreground/90 md:[&>span]:px-2">
            <span>
              {formattedPrice} / {room.price.paymentFrequency}
            </span>
            <span>{t(getRentTypeLabel(room.rentType))}</span>
            <span>
              {t("x_bathrooms", {
                count: room.commodities.whole.bathrooms,
              })}
            </span>
            <span>{t("roommates", { count: roommatesData.total })}</span>
            {room.verification.verifiedAt && (
              <Badge className="gap-1" variant="success">
                <HugeiconsIcon icon={SecurityCheckIcon} size={14} />
                {t("verified")}
              </Badge>
            )}
          </div>
        </div>

      </div>
      <ContactButtons
        email={room.contact.agent?.email ?? room.contact.owner?.email}
        infoMessage={t("contact_message", {
          name: room.title,
        })}
        phone={room.contact.agent?.phone ?? room.contact.owner?.phone}
      />
    </header>
  );
};
