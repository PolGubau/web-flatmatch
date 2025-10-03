import { t } from "i18next";
import { Link } from "react-router";
import { listYourRoomsQuery } from "../../model/queries/get-your-rooms.query";
import { RoomListWrapper } from "../rooms-list/room-list-wrapper";

export const YourRooms = () => {
	const { isLoading, rooms } = listYourRoomsQuery();
	return (
		<RoomListWrapper
			empty={
				<div>
					<p className="text-center text-gray-500">{t("you_have_no_rooms_yet")}</p>
					<Link className="text-blue-500 hover:underline" to="/rooms/new">
						{t("publish_first_property")}
					</Link>
				</div>
			}
			isLoading={isLoading}
			rooms={rooms}
			title="your_properties"
		/>
	);
};
