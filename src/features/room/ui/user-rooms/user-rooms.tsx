import { AlbumNotFound02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { listUserRoomsQuery } from "../../model/queries/get-user-rooms.query";
import { RoomListWrapper } from "../rooms-list/room-list-wrapper";

type Props = {
	userId: string;
};

export const UserRooms = ({ userId }: Props) => {
	const { isLoading, rooms } = listUserRoomsQuery(userId);
	return (
		<RoomListWrapper
			empty={
				<div className="flex flex-col gap-1">
					<HugeiconsIcon icon={AlbumNotFound02Icon} size={70} />
					<p className="text-xl pt-2">{t("user_has_no_rooms")}</p>
				</div>
			}
			isLoading={isLoading}
			rooms={rooms}
			title="user_properties"
		/>
	);
};

