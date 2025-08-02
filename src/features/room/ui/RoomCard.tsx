import type { Room } from "src/entities/room/room"

 
interface Props {
  room: Room
}

export const RoomCard = ({ room }: Props) => (
  <div className="rounded-xl border p-4 shadow-sm">
    <img src={room.images.main} alt={room.title} className="rounded-md h-40 w-full object-cover" />
    <h2 className="text-lg font-bold mt-2">{room.title}</h2>
    <p className="text-sm text-gray-600">{room.location.city}</p>
    <p className="text-md mt-1">{room.price.amount} {room.price.currency} / {room.price.paymentFrequency}</p>
  </div>
)
