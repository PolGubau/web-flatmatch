import { AlbumNotFound02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/shared/components/ui/button";
import { listYourRoomsQuery } from "../../model/queries/get-your-rooms.query";
import { RoomListWrapper } from "../rooms-list/room-list-wrapper";

export const YourRooms = () => {
	const { isLoading, rooms } = listYourRoomsQuery();
	return (
		<RoomListWrapper
			empty={
				<div className="flex flex-col gap-1">
					<HugeiconsIcon icon={AlbumNotFound02Icon} size={70} />
					<p className="text-xl pt-2">{t("you_have_no_rooms_yet")}</p>
					<Link to="/publish">
						<Button>
							<Plus size={18} />
							{t("publish_first_property")}
						</Button>
					</Link>
				</div>
			}
			isLoading={isLoading}
			rooms={rooms}
			title="your_properties"
		/>
	);
};
