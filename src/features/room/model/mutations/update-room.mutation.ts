import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Room } from "~/entities/room/room";
import { QUERY_KEYS } from "~/global/constants";
import { errorHandler } from "~/shared/utils/error-handler";
import { roomToEditableRoom } from "../../infra/adapter/room.adapter";
import { updateRoomService } from "../services/room.service";

/**
 * Hook de mutación para actualizar una Room y refrescar la cache.
 */
export const useUpdateRoomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (room: Room) =>
			updateRoomService(room.id, roomToEditableRoom(room)),
		onError: (error) => {
			errorHandler.logError(error, "Error updating room");
		},
		onSuccess: (updatedRoom) => {
			if (!updatedRoom) return;
			// Actualiza el cache de la room actualizada
			queryClient.setQueryData(
				QUERY_KEYS.rooms.detail(updatedRoom.id),
				updatedRoom,
			);
			// Invalida lista de rooms si existe
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms.all });
		},
	});
};
