import { AlbumNotFound02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useFavRooms } from "~/features/room/model/use-fav-rooms";
import { RoomListWrapper } from "~/features/room/ui/rooms-list/room-list-wrapper";

export default function FavsPage() {
	const { rooms, isLoading } = useFavRooms();

	return (
		<div className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto px-4 md:px-6 ">
			<RoomListWrapper
				empty={
					<div className="flex flex-col py-6">
						<HugeiconsIcon icon={AlbumNotFound02Icon} size={70} />
						<p className="text-xl pt-4">{t("no_favorites_yet")}</p>
						<p className="text-foreground/70">
							{t("add_some_favorites_swiping_right_on_home")}
						</p>
						<Link className="mt-4 flex gap-1 items-center underline text-primary font-medium" to="/">
							<ArrowLeft size={16} />
							{t("go_home")}
						</Link>
					</div>
				}
				isLoading={isLoading}
				rooms={rooms}
				title="favorites"
			/>
		</div>
	);
}
