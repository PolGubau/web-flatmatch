import { useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationService, messageService } from "../services/chat.service";

export const useSendMessageMutation = (conversationId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (content: string) =>
			messageService.send(conversationId, content),
		onSuccess: () => {
			// Refrescar mensajes y conversaciones
			queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
			queryClient.invalidateQueries({ queryKey: ["conversations"] });
		},
	});
};

export const useMarkAsReadMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (conversationId: string) =>
			messageService.markAsRead(conversationId),
		onSuccess: (_, conversationId) => {
			queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
			queryClient.invalidateQueries({ queryKey: ["conversations"] });
		},
	});
};

export const useGetOrCreateConversationMutation = () => {
	return useMutation({
		mutationFn: ({
			otherUserId,
			roomId,
		}: {
			otherUserId: string;
			roomId?: string;
		}) => conversationService.getOrCreate(otherUserId, roomId),
	});
};
