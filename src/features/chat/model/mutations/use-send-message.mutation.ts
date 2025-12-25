import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message } from "~/entities/message/message";
import { QUERY_KEYS } from "~/global/constants";
import { errorHandler } from "~/shared/utils/error-handler";
import { sendMessage } from "../../infra/chat-api";

export const useSendMessageMutation = (conversationId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (content: string) => sendMessage(conversationId, content),
		onError: (error) => {
			errorHandler.logError(error, "Error sending message");
		},
		onSuccess: (newMessage: Message) => {
			// Actualizar la lista de mensajes
			queryClient.setQueryData<Message[]>(
				QUERY_KEYS.chat.messages(conversationId),
				(old = []) => [...old, newMessage],
			);

			// Invalidar la lista de conversaciones para actualizar el último mensaje
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.conversations,
			});
		},
	});
};
