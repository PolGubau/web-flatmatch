import { useQuery } from "@tanstack/react-query";
import type { Room } from "~/entities/room/room";
import { listMultipleRoomsService, listYourRoomsService } from "../services/room.service";

/**
 * Hook para obtener una Room usando React Query.
 * Internamente delega en el servicio de aplicación.
 */

type YourRoomResponse = {
  isLoading: boolean;
  rooms: Room[];
};

type YourRoomQuery = () => YourRoomResponse;

export const listYourRoomsQuery: YourRoomQuery = () => {
  const { data, isLoading } = useQuery<Room[]>({
    queryFn: () => listYourRoomsService(),
    queryKey: ["your-rooms"],
  });

  return { isLoading, rooms: data ?? [] };
};
