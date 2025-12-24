import { ChattingIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { Owner } from "~/entities/room/room";
import { ProfileAvatar } from "~/features/user/ui/profile/avatar";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";
import { Separator } from "~/shared/components/ui/separator";
import { getRoomPath } from "~/shared/utils/path/get-room-path";
import { ContactButtons } from "../footer/contact-buttons";

type OwnerSidebarProps = {
  owner: Owner;
  roomId: string;
  roomTitle: string;
  contactEmail?: string;
  contactPhone?: string;
  roommates: {
    female: number;
    male: number;
    other: number;
    total: number;
  };
  onStartChat: () => void;
};

export const OwnerSidebar = ({
  owner,
  roomId,
  roomTitle,
  contactEmail,
  contactPhone,
  roommates,
  onStartChat,
}: OwnerSidebarProps) => {
  const { t } = useTranslation();

  return (
    <aside className="w-full lg:w-80 space-y-4 md:space-y-6">
      <Card className="lg:sticky lg:top-6">
        <CardHeader>
          <CardTitle>Published by</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <ProfileAvatar
              avatarUrl={owner.avatar}
              name={owner.name}
              size="lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{owner.name}</h3>
              <p className="text-sm text-muted-foreground">Landlord</p>
            </div>
          </div>

          <Separator />

          <Button className="w-full" onClick={onStartChat} size="lg">
            <HugeiconsIcon icon={ChattingIcon} size={20} />
            Message landlord
          </Button>

          <ContactButtons
            email={contactEmail}
            infoMessage={t("contact_message", {
              name: roomTitle,
              url: getRoomPath(roomId),
            })}
            phone={contactPhone}
          />
        </CardContent>
      </Card>

      {/* Current Tenants Info */}
      {roommates.total > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Roommates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roommates.female > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Female</span>
                  <Badge>{roommates.female}</Badge>
                </div>
              )}
              {roommates.male > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Male</span>
                  <Badge>{roommates.male}</Badge>
                </div>
              )}
              {roommates.other > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Other</span>
                  <Badge>{roommates.other}</Badge>
                </div>
              )}
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span className="text-sm">Total</span>
                <Badge variant="secondary">{roommates.total}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  );
};
