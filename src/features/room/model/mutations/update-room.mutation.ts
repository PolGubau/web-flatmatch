import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Room } from "~/entities/room/room";
import { updateRoomService } from "../services/room.service";

/**
 * Hook de mutación para actualizar una Room y refrescar la cache.
 */
export const useUpdateRoomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (room: Room) => updateRoomService(room.id, room),
		onSuccess: (updatedRoom) => {
			if (!updatedRoom) return;
			// Actualiza el cache de la room actualizada
			queryClient.setQueryData(["room", updatedRoom.id], updatedRoom);
			// Invalida lista de rooms si existe
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});
};
