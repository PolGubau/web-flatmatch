import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Room } from "~/entities/room/room";
import type { RoomAction } from "../../types/common";
import {
	interactWithRoomService,
	removeInteractionRoomService,
} from "../services/room.service";

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
		mutationFn: ({
			roomId,
			action,
		}: {
			roomId: Room["id"];
			action: RoomAction;
		}) => interactWithRoomService(roomId, action),
		onError: () => {
			props?.onFailedLike?.();
		},
		onSuccess: (res) => {
			if (!res) return;

			// No invalidamos ["rooms"] porque ya removemos la room del caché manualmente en useSwipeActions
			// Solo invalidamos la room individual por si está abierta en detalle
			queryClient.invalidateQueries({ queryKey: ["room", res.roomId] });
			props?.onSuccessLike?.();
		},
	});
	const removeLikeRoom = useMutation({
		mutationFn: (roomId: Room["id"]) => removeInteractionRoomService(roomId),
		onError: () => {
			props?.onFailedRemoveLike?.();
		},
		onSuccess: (res) => {
			if (!res) return;
			// No invalidamos ["rooms"] porque ya removemos la room del caché manualmente
			queryClient.invalidateQueries({ queryKey: ["room", res.roomId] });
			props?.onSuccessRemoveLike?.();
		},
	});

	return { likeRoom, removeLikeRoom };
};
