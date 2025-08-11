import type { Room } from '~/entities/room/room'
import { RoomFavsListItem } from './room-favs-list-item'
type Props = {
  rooms: Room[]
}
export function RoomList({ rooms }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {rooms?.map((room) => (
        <RoomFavsListItem key={room.id} room={room} />
      ))}
    </ul>
  )
}
