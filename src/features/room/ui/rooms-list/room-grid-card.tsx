import { CalendarAdd01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heart, ImageOff, Loader2 } from "lucide-react";
import { memo, useState } from "react";
import { Link } from "react-router";
import type { Room } from "~/entities/room/room";
import { Card, CardContent } from "~/shared/components/ui/card";
import { cn } from "~/shared/utils/utils";
import { useRoomFavoriteToggle } from "../hooks/useRoomFavoriteToggle";

type Props = Pick<Room, "id" | "title" | "description"> & {
  image: string;
  price: string;
  interaction?: { action: string | null };
  location?: string;
  availableFrom?: string;
};

export const RoomGridCard = memo(function RoomGridCard({
  id,
  title,
  description,
  image,
  price,
  interaction,
  location,
  availableFrom,
}: Props) {
  const isFavorite = interaction?.action === "like";
  const { toggleFavorite, isLoading } = useRoomFavoriteToggle({
    isFavorite,
    roomId: id,
  });
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
      <Link className="block" to={`/room/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageOff className="w-12 h-12 text-muted-foreground/50" />
            </div>
          ) : (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground/50" />
                </div>
              )}
              <img
                alt={title}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
                  imageLoading && "opacity-0",
                )}
                decoding="async"
                loading="lazy"
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                onLoad={() => setImageLoading(false)}
                src={image}
              />
            </>
          )}
          <button
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            aria-pressed={isFavorite}
            className={cn(
              "absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-md",
              "hover:bg-background hover:scale-110 transition-all duration-200",
              "active:scale-95",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "z-10",
            )}
            disabled={isLoading}
            onClick={toggleFavorite}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFavorite(e);
              }
            }}
            type="button"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <Heart
                className={cn(
                  "w-4 h-4 transition-all duration-200",
                  isFavorite
                    ? "fill-primary text-primary"
                    : "text-foreground hover:text-primary",
                )}
              />
            )}
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <span className="text-primary font-bold text-lg whitespace-nowrap">
                {price}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {location && (
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon
                  className="text-primary/70"
                  icon={Location01Icon}
                  size={14}
                />
                <span>{location}</span>
              </div>
            )}
            {availableFrom && (
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon
                  className="text-primary/70"
                  icon={CalendarAdd01Icon}
                  size={14}
                />
                <span>{new Date(availableFrom).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
});
