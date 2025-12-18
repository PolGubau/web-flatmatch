import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markMessagesAsRead } from "../../infra/chat-api";

export const useMarkAsReadMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (conversationId: string) => markMessagesAsRead(conversationId),
		onSuccess: (_, conversationId) => {
			// Invalidar conversaciones para actualizar el contador de no leídos
			queryClient.invalidateQueries({ queryKey: ["conversations"] });
			// Invalidar mensajes por si necesitamos reflejar el estado de leído
			queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
		},
	});
};
