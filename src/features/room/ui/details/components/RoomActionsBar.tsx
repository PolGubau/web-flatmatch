import {
  ChattingIcon,
  FavouriteIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "~/shared/components/ui/button";
import { cn } from "~/shared/utils/utils";

type RoomActionsBarProps = {
  isFavourite: boolean;
  isSharing: boolean;
  onShare: () => void;
  onChat: () => void;
  onFavouriteToggle: () => void;
};

export const RoomActionsBar = ({
  isFavourite,
  isSharing,
  onShare,
  onChat,
  onFavouriteToggle,
}: RoomActionsBarProps) => {
  return (
    <nav className="flex items-center gap-2">
      <Button
        disabled={isSharing}
        onClick={onShare}
        size="icon-lg"
        title="Share"
        variant="ghost"
      >
        <HugeiconsIcon 
          className={cn("transition-transform", {
            "animate-pulse": isSharing,
          })}
          icon={Share08Icon}
        />
      </Button>
      <Button onClick={onChat} size="icon-lg" title="Chat" variant="ghost">
        <HugeiconsIcon icon={ChattingIcon} />
      </Button>
      <Button
        onClick={onFavouriteToggle}
        size="icon-lg"
        title={isFavourite ? "Remove from favorites" : "Add to favorites"}
        variant="ghost"
      >
        <HugeiconsIcon
          className={cn("transition-colors", {
            "fill-red-500 text-red-500": isFavourite,
          })}
          icon={FavouriteIcon}
          size={26}
        />
      </Button>
    </nav>
  );
};
