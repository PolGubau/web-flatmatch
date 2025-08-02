// Simula acceso a API externa

import type { Room } from "src/entities/room/room"
import { mockRooms } from "../__mock__/rooms"

 
export const fetchRooms = async (): Promise<Room[]> => {
  await new Promise(r => setTimeout(r, 300)) // simula delay
  return mockRooms
}

export const fetchRoomById = async (id: string): Promise<Room | undefined> => {
  return mockRooms.find(r => r.id === id)
}
