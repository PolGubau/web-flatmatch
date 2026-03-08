import { RoomCardSkeleton } from "~/shared/components/ui/card-skeleton";
import { Skeleton } from "~/shared/components/ui/skeleton";
import { cn } from "~/shared/utils/utils";

interface RoomGridSkeletonProps {
	count?: number;
	className?: string;
	showTitle?: boolean;
}

/**
 * Skeleton para el grid de habitaciones
 * Coincide exactamente con RoomGrid para evitar CLS
 */
export const RoomGridSkeleton = ({
	count = 6,
	className,
	showTitle = false,
}: RoomGridSkeletonProps) => {
	return (
		<div className={cn("space-y-6", className)}>
			{showTitle && (
				<div className="space-y-2 animate-pulse">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-4 w-48" />
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: count }).map((_, i) => (
					<RoomCardSkeleton
						key={`room-skeleton-${
							// biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is fine
							i
						}`}
					/>
				))}
			</div>
		</div>
	);
};
