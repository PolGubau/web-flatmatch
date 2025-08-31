import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Room } from "~/entities/room/room";
import { likeRoomService, removeLikeRoomService } from "../services/room.service";

type Props = {
	onSuccessLike?: () => void;
	onSuccessRemoveLike?: () => void;
	onFailedLike?: () => void;
	onFailedRemoveLike?: () => void;
};

/**
 * Hook de mutación para actualizar tu interacción con una room
 */
export const useUpdateRoomInteraction = (props?: Props) => {
	const queryClient = useQueryClient();

	const likeRoom = useMutation({
		mutationFn: (roomId: Room["id"]) => likeRoomService(roomId),
		onError: () => {
			props?.onFailedLike?.();
		},
		onSuccess: (res) => {
			if (!res) return;

			// Invalida lista de rooms si existe
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
			queryClient.invalidateQueries({ queryKey: ["room", res.roomId] });
			props?.onSuccessLike?.();
		},
	});
	const removeLikeRoom = useMutation({
		mutationFn: (roomId: Room["id"]) => removeLikeRoomService(roomId),
		onError: () => {
			props?.onFailedRemoveLike?.();
		},
		onSuccess: (res) => {
			if (!res) return;
			// Invalida lista de rooms si existe
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
			queryClient.invalidateQueries({ queryKey: ["room", res.roomId] });
			props?.onSuccessRemoveLike?.();
		},
	});

	return { likeRoom, removeLikeRoom };
};
