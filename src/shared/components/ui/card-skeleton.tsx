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
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden animate-pulse">
      {showImage && <Skeleton className="w-full h-48 rounded-none" />}
      <div className="p-4 space-y-3">
        {showHeader && (
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              className="h-4 w-full"
              key={`line-${
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is fine
                i
                }`}
              style={{ width: `${100 - i * 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
