import { useRoomList } from "../model/useRoomList"
import { RoomCard } from "./RoomCard"

export const RoomList = () => {
  const { data: rooms, isLoading } = useRoomList()

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rooms?.map((room) => <RoomCard key={room.id} room={room} />)}
    </div>
  )
}
