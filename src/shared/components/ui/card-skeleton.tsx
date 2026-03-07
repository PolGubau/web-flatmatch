import { CalendarAdd01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent } from "./card";
import { Skeleton } from "./skeleton";

interface CardSkeletonProps {
  showImage?: boolean;
  showHeader?: boolean;
  lines?: number;
}

/**
 * Skeleton genérico de card (legacy)
 * @deprecated Usar RoomCardSkeleton para cards de habitaciones
 */
export const CardSkeleton = ({
  showImage = true,
  showHeader = true,
  lines = 3,
}: CardSkeletonProps) => {
  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {showImage && (
        <div className="relative aspect-[4/3] bg-muted">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      )}
      <div className="p-4 space-y-3">
        {showHeader && (
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-16" />
          </div>
        )}
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              className="h-4"
              key={`line-${
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is fine
                i
                }`}
              style={{ width: `${100 - i * 15}%` }}
            />
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton que coincide EXACTAMENTE con RoomGridCard
 * Replica la estructura visual para evitar CLS
 */
export const RoomCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border/50 animate-pulse">
      {/* Imagen - aspect-ratio video (16:9) */}
      <div className="relative aspect-video bg-muted">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Título y precio */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-7 w-2/3" /> {/* Título */}
            <Skeleton className="h-7 w-20" /> {/* Precio */}
          </div>
          {/* Descripción - 2 líneas */}
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Metadata (location + date) */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon
              className="text-muted-foreground/30"
              icon={Location01Icon}
              size={14}
            />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon
              className="text-muted-foreground/30"
              icon={CalendarAdd01Icon}
              size={14}
            />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
