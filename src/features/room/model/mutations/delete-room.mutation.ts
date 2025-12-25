import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "~/global/constants";
import { errorHandler } from "~/shared/utils/error-handler";
import { deleteRoomService } from "../services/room.service";

/**
 * Hook de mutación para eliminar una Room y refrescar la cache.
 */
export const useDeleteRoomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteRoomService,
		onError: (error) => {
			errorHandler.logError(error, "Error deleting room");
		},
		onSuccess: (_, id) => {
			// Invalida la cache de la room eliminada
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms.detail(id) });
			// Invalida lista de rooms si existe
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms.all });
		},
	});
};
