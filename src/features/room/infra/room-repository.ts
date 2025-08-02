import type { Room } from "src/entities/room/room"
import { fetchRooms, fetchRoomById } from "./room-api"

export const RoomRepository = {
  getAll: (): Promise<Room[]> => fetchRooms(),
  getById: (id: string): Promise<Room | undefined> => fetchRoomById(id),
}
