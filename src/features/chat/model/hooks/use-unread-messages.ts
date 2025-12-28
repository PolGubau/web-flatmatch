import { useEffect, useRef, useState } from "react";
import { supabase } from "~/global/supabase/client";
import { getConversations } from "../../infra/chat-api";

const CACHE_DURATION = 30000; // 30 segundos de caché
const REFETCH_DEBOUNCE = 2000; // 2 segundos de debounce

/**
 * Hook para obtener el contador total de mensajes no leídos
 * Con caché de 30s y debounce para evitar peticiones constantes
 */
export function useUnreadMessages() {
	const [unreadCount, setUnreadCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const lastFetchRef = useRef<number>(0);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
	const cacheRef = useRef<number | null>(null);

	// Función para calcular mensajes no leídos con caché
	const fetchUnreadCount = async (force = false) => {
		const now = Date.now();

		// Si hay caché válido y no es forzado, usar caché
		if (
			!force &&
			cacheRef.current !== null &&
			now - lastFetchRef.current < CACHE_DURATION
		) {
			setUnreadCount(cacheRef.current);
			setIsLoading(false);
			return;
		}
		try {
			const conversations = await getConversations();
			const total = conversations.reduce(
				(acc, conv) => acc + conv.unreadCount,
				0,
			);
			setUnreadCount(total);
			cacheRef.current = total;
			lastFetchRef.current = now;
		} catch (error) {
			console.error("Error fetching unread messages:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Refetch con debounce para evitar múltiples peticiones seguidas
	const debouncedRefetch = () => {
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		debounceTimerRef.current = setTimeout(() => {
			fetchUnreadCount(true);
		}, REFETCH_DEBOUNCE);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: ok
	useEffect(() => {
		// Cargar inicial
		fetchUnreadCount();

		// Suscribirse a cambios en tiempo real (con debounce)
		const channel = supabase
			.channel("unread-messages")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "messages",
				},
				debouncedRefetch,
			)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "conversations",
				},
				debouncedRefetch,
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	return { isLoading, unreadCount };
}
