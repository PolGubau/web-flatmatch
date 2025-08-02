import { useQuery } from "@tanstack/react-query"
import { RoomRepository } from "../infra/room-repository"

export const useRoomList = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: RoomRepository.getAll,
  })
}
