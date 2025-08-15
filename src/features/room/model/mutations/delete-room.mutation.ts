import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoomService } from "../services/room.service";

/**
 * Hook de mutación para eliminar una Room y refrescar la cache.
 */
export const useDeleteRoomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteRoomService,
		onSuccess: (_, id) => {
			// Invalida la cache de la room eliminada
			queryClient.invalidateQueries({ queryKey: ["room", id] });
			// Invalida lista de rooms si existe
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});
};
