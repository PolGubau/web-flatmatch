import { Skeleton } from "./skeleton";

interface ListSkeletonProps {
  count?: number;
  showAvatar?: boolean;
  className?: string;
}

export const ListSkeleton = ({
  count = 5,
  showAvatar = true,
  className,
}: ListSkeletonProps) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          className="flex items-center gap-3 p-4 border-b border-border/50"
          key={`list-skeleton-${
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is fine
            i
            }`}
        >
          {showAvatar && (
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="w-16 h-8 rounded-md" />
        </div>
      ))}
    </div>
  );
};
