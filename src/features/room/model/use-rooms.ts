import type { Room } from "~/entities/room/room";
import { useListRoomsQuery } from "./queries/list-rooms.query";

type UseRoomsResponse = {
	rooms: Room[];
	isLoading: boolean;
};

export const useRooms = (): UseRoomsResponse => {
	const { rooms, isLoading } = useListRoomsQuery();
	return { isLoading, rooms };
};
