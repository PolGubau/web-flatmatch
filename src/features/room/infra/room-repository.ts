import { getAllRooms, getManyRooms, getOneRoom, type GetAll, type GetMany, type GetOne } from "./room-api"

type RoomRepository = {
  getAll: GetAll
  getOne: GetOne
  getMany: GetMany
}
export const RoomRepository: RoomRepository = {
  getAll: () => getAllRooms(),
  getOne: (id) => getOneRoom(id),
  getMany: (ids) => getManyRooms(ids),
}
