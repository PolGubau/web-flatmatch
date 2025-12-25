import {
  ChattingIcon,
  FavouriteIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "~/shared/components/ui/button";
import { LikeButton } from "~/shared/components/ui/like-button";
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
    <nav
      className="flex gap-1 items-center fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
      style={{ zIndex: 999 }}
    >
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
      <LikeButton isLiked={isFavourite} onToggle={onFavouriteToggle} />
      {/* <Button
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
      </Button> */}
    </nav>
  );
};
