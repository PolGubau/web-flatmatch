import { CardSkeleton } from "~/shared/components/ui/card-skeleton";
import { cn } from "~/shared/utils/utils";

interface RoomGridSkeletonProps {
  count?: number;
  className?: string;
}

export const RoomGridSkeleton = ({
  count = 6,
  className,
}: RoomGridSkeletonProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-foreground/10 rounded-lg animate-pulse" />
          <div className="h-4 w-48 bg-foreground/5 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton
            key={`room-skeleton-${
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is fine
              i
              }`}
            lines={2}
            showHeader
            showImage
          />
        ))}
      </div>
    </div>
  );
};
