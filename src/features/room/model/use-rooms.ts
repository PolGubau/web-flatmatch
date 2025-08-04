import { useQuery } from "@tanstack/react-query";
import { RoomRepository } from "../infra/room-repository";

export const useRooms = (ids: string[]) => {

  const { data } = useQuery({
    queryKey: ["rooms", ids],
    queryFn: () => RoomRepository.getMany(ids),
    enabled: !!ids.length,
  });
  const rooms = data || [];


  return { rooms };

}
