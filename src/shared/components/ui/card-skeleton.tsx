import { Skeleton } from "./skeleton";

interface CardSkeletonProps {
  showImage?: boolean;
  showHeader?: boolean;
  lines?: number;
}

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
