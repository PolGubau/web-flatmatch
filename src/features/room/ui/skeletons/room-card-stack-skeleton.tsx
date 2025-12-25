import { Skeleton } from "~/shared/components/ui/skeleton";

export const RoomCardStackSkeleton = () => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Carta de fondo */}
      <div className="absolute inset-0 rotate-2 scale-95 opacity-30">
        <Skeleton className="w-full h-[60vh] rounded-3xl" />
      </div>

      {/* Carta principal */}
      <div className="relative w-full h-[60vh] bg-card border border-border/50 rounded-3xl overflow-hidden shadow-2xl animate-pulse">
        {/* Imagen */}
        <Skeleton className="w-full h-2/3 rounded-none" />

        {/* Contenido */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        {/* Overlay con pulse */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};
