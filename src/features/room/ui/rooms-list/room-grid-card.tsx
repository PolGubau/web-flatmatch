import { CalendarAdd01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { memo } from "react";
import type { Room } from "~/entities/room/room";
import { Card, CardContent } from "~/shared/components/ui/card";
import { OptimizedImage } from "~/shared/components/ui/optimized-image";
import { PrefetchLink } from "~/shared/components/ui/prefetch-link";

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
  location,
  availableFrom,
}: Props) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
      <PrefetchLink className="block" to={`/room/${id}`}>
        <OptimizedImage
          alt={title}
          aspectRatio="video"
          className="group-hover:scale-105 transition-transform duration-300"
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
      </PrefetchLink>
    </Card>
  );
});
