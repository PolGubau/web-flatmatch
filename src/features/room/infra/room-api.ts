
import type { Room } from "src/entities/room/room"
import { mockRooms } from "../__mock__/rooms"

type Id = Room["id"]

export type GetAll = () => Promise<Room[]>
export const getAllRooms: GetAll = async () => {
  await new Promise(r => {
    setTimeout(() => r(mockRooms), 500);
  });

  return mockRooms
}

export type GetOne = (id: Id) => Promise<Room | undefined>
export const getOneRoom: GetOne = async (id) => {
  return mockRooms.find(r => r.id === id)
}

export type GetMany = (ids: Id[]) => Promise<Room[]>
export const getManyRooms: GetMany = async (ids) => {
  return mockRooms.filter(r => ids.includes(r.id)) ?? []
}
 