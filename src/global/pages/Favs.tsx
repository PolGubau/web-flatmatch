import { useRooms } from "~/features/room/model/use-rooms"
import { RoomList } from "~/features/room/ui/favs/room-favs-list"
import { mockUser } from "~/features/user/__mock__/users"

export default function FavsPage() {
  const { savedRoomIds } = mockUser
  const { rooms } = useRooms(savedRoomIds ?? [])
  return (
    <div>


      <RoomList rooms={rooms} />
    </div>
  )
}
