import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Message } from "~/entities/message/message";
import { subscribeToMessages } from "../infra/chat-api";

export const useRealtimeMessages = (conversationId: string | null) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!conversationId) return;

		const channel = subscribeToMessages(
			conversationId,
			(newMessage: Message) => {
				// Agregar el nuevo mensaje a la lista
				queryClient.setQueryData<Message[]>(
					["messages", conversationId],
					(old = []) => {
						// Evitar duplicados
						if (old.some((msg) => msg.id === newMessage.id)) return old;
						return [...old, newMessage];
					},
				);

				// Invalidar conversaciones para actualizar último mensaje
				queryClient.invalidateQueries({ queryKey: ["conversations"] });
			},
		);

		return () => {
			channel.unsubscribe();
		};
	}, [conversationId, queryClient]);
};
