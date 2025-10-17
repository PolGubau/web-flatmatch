import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	FilterIcon,
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
		<section className="grid grid-rows-[1fr_auto] gap-4 h-full py-4 md:py-8 overflow-hidden">
			<div className="grid grid-rows-1 grid-cols-1 mx-auto place-items-center">
				{thereAreRooms && (
					<div className="grid grid-rows-[1fr_auto] gap-6 h-full items-center">
						<Drawer
							className="max-w-7xl mx-auto"
							isOpen={!!bottomDrawerRoom}
							onClose={handleCloseDrawer}
						>
							{bottomDrawerRoom && <RoomDetails room={bottomDrawerRoom} />}
						</Drawer>

						<div className="relative h-full w-full grid place-items-center max-h-[900px]">
							{[...rooms].map((room, index) => (
								<RoomTinderCard
									index={index}
									key={room.id}
									onSwipe={onSwipe}
									room={room}
								/>
							))}
						</div>

						<nav className="flex gap-4 justify-between mx-auto w-[80vw] max-w-[500px]">
							<Button
								className="bg-error/10 size-14"
								disabled={isLoading}
								onClick={() => onSwipe(rooms[0].id, "left")}
								size={"icon"}
								variant={"ghost"}
							>
								<HugeiconsIcon icon={ArrowLeft01Icon} size={25} />
							</Button>
							<Button
								className="h-14"
								disabled={isLoading}
								onClick={() => onSwipe(rooms[0].id, "up")}
								variant={"ghost"}
							>
								<HugeiconsIcon icon={ArrowUp01Icon} />
								<span className="max-sm:hidden">{t("see_details")}</span>
							</Button>
							<Button
								className="bg-success/10 size-14"
								disabled={isLoading}
								onClick={() => onSwipe(rooms[0].id, "right")}
								size={"icon"}
								variant={"ghost"}
							>
								<HugeiconsIcon icon={ArrowRight01Icon} />
							</Button>
						</nav>
					</div>
				)}

				{!thereAreRooms && (
					<div className="text-center form text-foreground/60 max-w-md items-center">
						{t("there_are_no_more_rooms")}
						<Button className="group" disabled={isLoading} onClick={refetch}>
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
			</div>{" "}
			<nav className="flex gap-4 items-center justify-center p-1">
				<FiltersModal />
			</nav>
		</section>
	);
}
