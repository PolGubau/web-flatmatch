import { Skeleton } from "~/shared/components/ui/skeleton";

export const ChatMessagesSkeleton = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header skeleton */}
      <div className="p-4 border-b border-border/50 bg-card">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Messages skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.from({ length: 8 }, (_, i) => ({
          id: `skeleton-msg-${i}`,
          isOwn: i % 3 === 0,
        })).map(({ id, isOwn }) => (
          <div
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            key={id}
          >
            <div
              className={`flex gap-2 max-w-[70%] ${isOwn ? "flex-row-reverse" : ""}`}
            >
              <Skeleton className="w-8 h-8 rounded-full shrink-0" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className={`h-16 ${isOwn ? "w-48" : "w-64"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input skeleton */}
      <div className="p-4 border-t border-border/50 bg-card">
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
};
