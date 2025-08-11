import { useQuery } from "@tanstack/react-query";
import { RoomRepository } from "../infra/room-repository";

export const getRoom = (id: string) => {
	const { data: room, isLoading } = useQuery({
		enabled: !!id,
		queryFn: () => RoomRepository.getOne(id),
		queryKey: ["room", id],
	});
	return { isLoading, room };
};

export const useRoom = (id: string) => {
	const { room, isLoading } = getRoom(id);
	return { isLoading, room };
};
