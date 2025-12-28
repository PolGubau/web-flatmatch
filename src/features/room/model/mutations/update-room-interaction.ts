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
	previousFavorites?: RoomWithMetadata[];
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
		{ roomId: string; action: RoomAction | null; lastActionAt: string | null },
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
			if (context?.previousFavorites) {
				queryClient.setQueryData(
					QUERY_KEYS.rooms.favorites,
					context.previousFavorites,
				);
			}
			props?.onFailedLike?.();
		},
		onMutate: async ({ roomId, action }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.rooms.detail(roomId),
			});
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.rooms.favorites,
			});

			// Snapshot the previous value
			const previousRoom = queryClient.getQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(roomId),
			);
			const previousFavorites = queryClient.getQueryData<RoomWithMetadata[]>(
				QUERY_KEYS.rooms.favorites,
			);

			// Optimistically update room detail
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

			// Optimistically update favorites list
			queryClient.setQueryData<RoomWithMetadata[]>(
				QUERY_KEYS.rooms.favorites,
				(old) => {
					if (!old) return old;
					// Update the room in the list if it exists
					return old.map((room) =>
						room.id === roomId
							? {
									...room,
									interaction: {
										...room.interaction,
										action: action,
										lastActionAt: new Date().toISOString(),
									},
								}
							: room,
					);
				},
			);

			// Return context with the snapshotted value
			return { previousFavorites, previousRoom };
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

			// Actualizar favoritos directamente en el cache
			queryClient.setQueryData<RoomWithMetadata[]>(
				QUERY_KEYS.rooms.favorites,
				(old) => {
					if (!old) return old;
					return old.map((room) =>
						room.id === res.roomId
							? {
									...room,
									interaction: {
										...room.interaction,
										action: res.action,
										lastActionAt: res.lastActionAt,
									},
								}
							: room,
					);
				},
			);
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
			if (context?.previousFavorites) {
				queryClient.setQueryData(
					QUERY_KEYS.rooms.favorites,
					context.previousFavorites,
				);
			}
			props?.onFailedRemoveLike?.();
		},
		onMutate: async (roomId) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.rooms.detail(roomId),
			});
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.rooms.favorites,
			});

			// Snapshot the previous value
			const previousRoom = queryClient.getQueryData<RoomWithMetadata>(
				QUERY_KEYS.rooms.detail(roomId),
			);
			const previousFavorites = queryClient.getQueryData<RoomWithMetadata[]>(
				QUERY_KEYS.rooms.favorites,
			);

			// Optimistically update room detail
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

			// Optimistically remove from favorites list
			queryClient.setQueryData<RoomWithMetadata[]>(
				QUERY_KEYS.rooms.favorites,
				(old) => {
					if (!old) return old;
					// Remove the room from favorites
					return old.filter((room) => room.id !== roomId);
				},
			);

			// Return context with the snapshotted value
			return { previousFavorites, previousRoom };
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

			// Actualizar favoritos directamente en el cache (remover de la lista)
			queryClient.setQueryData<RoomWithMetadata[]>(
				QUERY_KEYS.rooms.favorites,
				(old) => {
					if (!old) return old;
					return old.filter((room) => room.id !== res.roomId);
				},
			);
			props?.onSuccessRemoveLike?.();
		},
	});

	return { likeRoom, removeLikeRoom };
};
