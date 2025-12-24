import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	RefreshIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { useTinderCards } from "~/features/room/model/use-tinder-cards";
import RoomDetails from "~/features/room/ui/details/room-details";
import { FiltersModal } from "~/features/room/ui/feed/filters/filters-modal";
import { RoomTinderCard } from "~/features/room/ui/room-tinder-card";
import { LoadingCardsSection } from "~/shared/components/pages/LoadingCardsSection";
import { Button } from "~/shared/components/ui/button";
import { Drawer } from "~/shared/components/ui/drawer";

export default function HomePage() {
	const {
		rooms,
		onSwipe,
		bottomDrawerRoom,
		handleCloseDrawer,
		isLoading,
		refetch,
	} = useTinderCards();

	if (isLoading) return <LoadingCardsSection />;

	const thereAreRooms = rooms.length > 0 && !isLoading;

	return (
		<section className="grid grid-rows-[1fr_auto] gap-4 h-full overflow-hidden">
			<div className="grid grid-rows-1 grid-cols-1 mx-auto place-items-center px-4">
				{thereAreRooms && (<>
					<div className="grid grid-rows-[1fr_auto] gap-4 h-full w-full items-center">


						<div className="relative h-full w-full grid place-items-center max-h-[calc(100dvh-12rem)] md:max-h-[min(800px,calc(100dvh-10rem))]">
							{rooms.map((room, index) => (
								<RoomTinderCard
									index={index}
									key={room.id}
									onSwipe={onSwipe}
									room={room}
								/>
							))}
						</div>

						<nav className="flex gap-4 justify-between mx-auto w-[80vw] max-w-lg relative z-20">
							<Button
								className="bg-destructive/10 size-14"
								disabled={isLoading}
								onClick={() => onSwipe(rooms[0].id, "left")}
								size={"icon"}
								variant={"ghost"}
							>
								<HugeiconsIcon icon={ArrowLeft01Icon} size={25} />
							</Button>
							<Button
								className="max-md:size-14 md:h-14 md:flex-1"
								disabled={isLoading}
								onClick={() => onSwipe(rooms[0].id, "up")}
								variant={"secondary"}
							>
								<HugeiconsIcon icon={ArrowUp01Icon} />
								<span className="max-sm:hidden">{t("see_details")}</span>
							</Button>
							<FiltersModal />

							<Button
								className="bg-green-500/20 size-14"
								disabled={isLoading}
								onClick={() => onSwipe(rooms[0].id, "right")}
								size={"icon"}
								variant={"ghost"}
							>
								<HugeiconsIcon icon={ArrowRight01Icon} />
							</Button>
						</nav>
					</div>
					<Drawer
						className="max-w-7xl mx-auto"
						onClose={handleCloseDrawer}
						open={!!bottomDrawerRoom}
					>
						{bottomDrawerRoom && <RoomDetails room={bottomDrawerRoom} />}
					</Drawer>
				</>
				)}

				{!thereAreRooms && (
					<div className="text-center form text-foreground/60 max-w-md items-center">
						{t("there_are_no_more_rooms")}
						<Button
							className="group"
							disabled={isLoading}
							onClick={() => refetch()}
						>
							<HugeiconsIcon
								className="group-focus:rotate-180 transition-all"
								icon={RefreshIcon}
								size={16}
								strokeWidth={3}
							/>
							{t("reload")}
						</Button>
					</div>
				)}
			</div>

		</section>
	);
}
