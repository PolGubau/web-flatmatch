import { useQuery } from "@tanstack/react-query";
import { RoomRepository } from "../infra/room-repository";

export const useRoom = (id: string) => {

  const { data: room } = useQuery({
    queryKey: ["room", id],
    queryFn: () => RoomRepository.getOne(id),
    enabled: !!id,
  });

  return { room };

}
