import { useQuery } from "@tanstack/react-query";
import { RoomRepository } from "../infra/room-repository";

export const useRoomList = () => {
	return useQuery({
		queryFn: () => RoomRepository.findAll({}),
		queryKey: ["rooms"],
	});
};
