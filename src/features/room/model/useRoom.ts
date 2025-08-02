import { useQuery } from "@tanstack/react-query"
import { RoomRepository } from "../infra/room-repository"

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => RoomRepository.getById(id),
    enabled: !!id,
  })
}
