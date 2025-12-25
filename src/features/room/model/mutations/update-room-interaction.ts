import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { QUERY_KEYS } from "~/global/constants";
import { errorHandler } from "~/shared/utils/error-handler";
import type { RoomAction } from "../../types/common";
import {
	interactWithRoomService,
	removeInteractionRoomService,
} from "../services/room.service";

type MutationContext = {
	previousRoom: RoomWithMetadata | undefined;
};

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

	const likeRoom = useMutation<
		{ roomId: string; action: RoomAction | null; lastActionAt: string },
		Error,
		{ roomId: Room["id"]; action: RoomAction },
		MutationContext
	>({
		mutationFn: ({
			roomId,
			action,
		}: {
			roomId: Room["id"];
			action: RoomAction;
		}) => interactWithRoomService(roomId, action),
		onError: (error, variables, context) => {
			errorHandler.logError(error, "Like room mutation");
			// If the mutation fails, use the context-value from onMutate
			if (context?.previousRoom) {
				queryClient.setQueryData(
					QUERY_KEYS.rooms.detail(variables.roomId),
					context.previousRoom,
				);
			}
			props?.onFailedLike?.();
		},
		onMutate: async ({ roomId, action }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.rooms.detail(roomId),
			});

			// Snapshot the previous value
			const previousRoom = queryClient.getQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(roomId),
			);

			// Optimistically update to the new value
			queryClient.setQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(roomId),
				(old) => {
					if (!old) return old;
					return {
						...old,
						interaction: {
							...old.interaction,
							action: action,
							lastActionAt: new Date().toISOString(),
						},
					};
				},
			);

			// Return context with the snapshotted value
			return { previousRoom };
		},
		onSuccess: (res) => {
			if (!res) return;

			// Actualizar el cache directamente con la respuesta del servidor
			queryClient.setQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(res.roomId),
				(old) => {
					if (!old) return old;
					return {
						...old,
						interaction: {
							action: res.action,
							lastActionAt: res.lastActionAt,
						},
					};
				},
			);

			// Invalidamos favoritos para que se actualice cuando el usuario navegue a /favs
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms.favorites });
			props?.onSuccessLike?.();
		},
	});
	const removeLikeRoom = useMutation<
		{ roomId: string },
		Error,
		Room["id"],
		MutationContext
	>({
		mutationFn: (roomId: Room["id"]) => removeInteractionRoomService(roomId),
		onError: (error, roomId, context) => {
			errorHandler.logError(error, "Remove like mutation");
			// If the mutation fails, use the context-value from onMutate
			if (context?.previousRoom) {
				queryClient.setQueryData(
					QUERY_KEYS.rooms.detail(roomId),
					context.previousRoom,
				);
			}
			props?.onFailedRemoveLike?.();
		},
		onMutate: async (roomId) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.rooms.detail(roomId),
			});

			// Snapshot the previous value
			const previousRoom = queryClient.getQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(roomId),
			);

			// Optimistically update to remove the interaction
			queryClient.setQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(roomId),
				(old) => {
					if (!old) return old;
					return {
						...old,
						interaction: {
							...old.interaction,
							action: null,
							lastActionAt: null,
						},
					};
				},
			);

			// Return context with the snapshotted value
			return { previousRoom };
		},
		onSuccess: (res) => {
			if (!res) return;

			// Actualizar el cache directamente con la respuesta del servidor
			queryClient.setQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(res.roomId),
				(old) => {
					if (!old) return old;
					return {
						...old,
						interaction: {
							action: null,
							lastActionAt: null,
						},
					};
				},
			);

			// Invalidamos favoritos para que se actualice cuando el usuario quite el like
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms.favorites });
			props?.onSuccessRemoveLike?.();
		},
	});

	return { likeRoom, removeLikeRoom };
};
