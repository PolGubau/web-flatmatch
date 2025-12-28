import { useEffect, useState } from "react";
import { supabase } from "~/global/supabase/client";
import { getConversations } from "../../infra/chat-api";

/**
 * Hook para obtener el contador total de mensajes no leídos
 * Se actualiza en tiempo real usando Supabase Realtime
 */
export function useUnreadMessages() {
	const [unreadCount, setUnreadCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	// Función para calcular mensajes no leídos
	const fetchUnreadCount = async () => {
		try {
			const conversations = await getConversations();
			const total = conversations.reduce(
				(acc, conv) => acc + conv.unreadCount,
				0,
			);
			setUnreadCount(total);
		} catch (error) {
			console.error("Error fetching unread messages:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// Cargar inicial
		fetchUnreadCount();

		// Suscribirse a cambios en tiempo real en la tabla messages
		const channel = supabase
			.channel("unread-messages")
			.on(
				"postgres_changes",
				{
					event: "*", // INSERT, UPDATE, DELETE
					schema: "public",
					table: "messages",
				},
				() => {
					// Refetch cuando hay cambios en mensajes
					fetchUnreadCount();
				},
			)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "conversations",
				},
				() => {
					// Refetch cuando se actualiza una conversación
					fetchUnreadCount();
				},
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);

	return { isLoading, unreadCount };
}
