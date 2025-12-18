import { Skeleton } from "~/shared/components/ui/skeleton";

export const ConversationListSkeleton = () => {
  return (
    <div className="flex flex-col h-full">
      {Array.from({ length: 5 }, (_, i) => `skeleton-conv-${i}`).map((id) => (
        <div
          className="p-4 border-b border-border/50 hover:bg-accent/50 transition-colors"
          key={id}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
