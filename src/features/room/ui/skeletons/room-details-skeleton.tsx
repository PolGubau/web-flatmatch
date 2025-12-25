import { Skeleton } from "~/shared/components/ui/skeleton";

export const RoomDetailsSkeleton = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header con imagen */}
      <div className="relative">
        <Skeleton className="w-full h-64 md:h-96 rounded-none" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 space-y-6">
        {/* Título y precio */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2 items-center">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                className="h-10 rounded-lg"
                key={`amenity-skeleton-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is fine
                  i
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Propietario */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-3 p-4 border border-border/50 rounded-lg">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
