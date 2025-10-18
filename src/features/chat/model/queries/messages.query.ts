import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { subscribeToMessages } from "../../infra/chat-api";
import { messageService } from "../services/chat.service";

export const useMessagesQuery = (conversationId: string | null) => {
	const query = useQuery({
		enabled: !!conversationId,
		queryFn: () =>
			conversationId ? messageService.getByConversation(conversationId) : [],
		queryKey: ["messages", conversationId],
		refetchOnWindowFocus: false,
	});

	// Suscripción en tiempo real
	useEffect(() => {
		if (!conversationId) return;

		const channel = subscribeToMessages(conversationId, (newMessage) => {
			// Actualizar caché con el nuevo mensaje
			query.refetch();
		});

		return () => {
			channel.unsubscribe();
		};
	}, [conversationId]);

	return query;
};
