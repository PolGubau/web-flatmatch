import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message } from "~/entities/message/message";
import { sendMessage } from "../../infra/chat-api";

export const useSendMessageMutation = (conversationId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (content: string) => sendMessage(conversationId, content),
		onSuccess: (newMessage: Message) => {
			// Actualizar la lista de mensajes
			queryClient.setQueryData<Message[]>(
				["messages", conversationId],
				(old = []) => [...old, newMessage],
			);

			// Invalidar la lista de conversaciones para actualizar el último mensaje
			queryClient.invalidateQueries({ queryKey: ["conversations"] });
		},
	});
};
