import { AlbumNotFound02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import type { RoomWithMetadata } from "~/entities/room/room";
import { useFavRooms } from "~/features/room/model/use-fav-rooms";
import { RoomGrid } from "~/features/room/ui/rooms-list/room-grid";
import {
	RoomGridFilters,
	type SortOption,
} from "~/features/room/ui/rooms-list/room-grid-filters";
import { RoomGridSkeleton } from "~/features/room/ui/skeletons/room-grid-skeleton";
import { ErrorBoundary } from "~/shared/components/error-boundary/error-boundary";

const sortRooms = (rooms: RoomWithMetadata[], sortBy: SortOption) => {
	const sorted = [...rooms];

	switch (sortBy) {
		case "price-asc":
			return sorted.sort((a, b) => a.price.amount - b.price.amount);
		case "price-desc":
			return sorted.sort((a, b) => b.price.amount - a.price.amount);
		case "date-desc":
			return sorted.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
		case "date-asc":
			return sorted.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			);
		default:
			return sorted;
	}
};

export default function FavsPage() {
	const { rooms, isLoading, refetch } = useFavRooms();
	const [sortBy, setSortBy] = useState<SortOption>("date-desc");

	const sortedRooms = useMemo(() => sortRooms(rooms, sortBy), [rooms, sortBy]);

	if (isLoading) {
		return (
			<div className="overflow-y-auto overflow-x-hidden max-w-7xl mx-auto px-4 md:px-6 py-6">
				<h1 className="text-2xl font-bold mb-6">{t("favorites")}</h1>
				<RoomGridSkeleton count={6} />
			</div>
		);
	}

	return (
		<ErrorBoundary onReset={refetch}>
			<div className="overflow-y-auto overflow-x-hidden max-w-7xl mx-auto px-4 md:px-6 py-6">
				<h1 className="text-2xl font-bold mb-6">{t("favorites")}</h1>

				{rooms.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-12 gap-4">
						<HugeiconsIcon
							className="text-muted-foreground"
							icon={AlbumNotFound02Icon}
							size={70}
						/>
						<div className="text-center space-y-2">
							<p className="text-xl font-semibold">{t("no_favorites_yet")}</p>
							<p className="text-foreground/70 max-w-md">
								{t("add_some_favorites_swiping_right_on_home")}
							</p>
						</div>
						<Link
							className="mt-4 flex gap-2 items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
							to="/"
						>
							<ArrowLeft size={16} />
							{t("go_home")}
						</Link>
					</div>
				) : (
					<>
						<RoomGridFilters
							currentSort={sortBy}
							onSortChange={setSortBy}
							totalCount={rooms.length}
						/>
						<RoomGrid rooms={sortedRooms} />
					</>
				)}
			</div>
		</ErrorBoundary>
	);
}
