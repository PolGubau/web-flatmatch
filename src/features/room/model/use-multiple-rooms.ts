import type { Room } from "~/entities/room/room";
import { listRoomsQuery } from "./queries/list-rooms.query";

type UseRoomsResponse = {
	rooms: Room[];
	isLoading: boolean;
};

export const useRooms = (_id:string[]): UseRoomsResponse => {
	const { rooms, isLoading } = listRoomsQuery();
	return { isLoading, rooms };
};
