import { RoomCardStackSkeleton } from "~/features/room/ui/skeletons/room-card-stack-skeleton";
import { cn } from "~/shared/utils/utils";

export const LoadingCardsSection = () => {
	return (
		<section className={cn("w-full h-full grid place-items-center p-4")}>
			<RoomCardStackSkeleton />
		</section>
	);
};
