import { RoomTinderCardUILoader } from "~/features/room/ui/room-tinder-card-ui-loader";
import { cn } from "~/shared/utils/utils";

export const LoadingCardsSection = () => {
	return (
		<section className={cn("w-full h-full grid place-items-center p-4")}>
			<div className="h-[60vh] bg-neutral-500 overflow-hidden w-[80vw] max-w-[500px] rounded-3xl pointer-events-none origin-bottom shadow shadow-neutral-500/10 relative">
				<RoomTinderCardUILoader />
			</div>
		</section>
	);
};
