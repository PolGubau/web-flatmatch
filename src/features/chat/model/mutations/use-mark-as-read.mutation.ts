import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "~/global/constants";
import { errorHandler } from "~/shared/utils/error-handler";
import { markMessagesAsRead } from "../../infra/chat-api";

export const useMarkAsReadMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (conversationId: string) => markMessagesAsRead(conversationId),
		onError: (error) => {
			errorHandler.logError(error, "Error marking messages as read");
		},
		onSuccess: (_, conversationId) => {
			// Invalidar conversaciones para actualizar el contador de no leídos
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.conversations,
			});
			// Invalidar mensajes por si necesitamos reflejar el estado de leído
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.messages(conversationId),
			});
		},
	});
};
