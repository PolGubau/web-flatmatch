import { t } from "i18next";
import type React from "react";
import type { RoomWithMetadata } from "~/entities/room/room";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { RoomList, RoomListSkeleton } from "./room-list";

type Props = {
	title: TranslationKey;
	rooms: RoomWithMetadata[];
	isLoading?: boolean;
	empty?: React.ReactNode;
};
export const RoomListWrapper = ({ title, rooms, isLoading, empty }: Props) => {
	return (
		<section className="flex flex-col gap-4">
			<strong className="text-xl font-semibold">{t(title)}</strong>
			{isLoading ? (
				<RoomListSkeleton />
			) : (
				<RoomListWithEmpty empty={empty} rooms={rooms} />
			)}
		</section>
	);
};

const RoomListWithEmpty = ({
	rooms,
	empty,
}: {
	rooms: RoomWithMetadata[];
	empty?: React.ReactNode;
}) => {
	if (rooms.length === 0) {
		return empty;
	}
	return <RoomList rooms={rooms} />;
};
