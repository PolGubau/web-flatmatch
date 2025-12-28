import { useEffect, useRef } from "react";
import { useNotificationPermission } from "~/shared/hooks/use-notification-permission";
import { useUnreadMessages } from "./use-unread-messages";

/**
 * Hook que combina unread messages con notificaciones nativas
 * Muestra notificación del navegador cuando llega un mensaje nuevo
 */
export function useChatNotifications() {
	const { unreadCount } = useUnreadMessages();
	const { showNotification, permission } = useNotificationPermission();
	const previousCount = useRef(unreadCount);

	useEffect(() => {
		// Si aumentó el contador de no leídos, mostrar notificación
		if (unreadCount > previousCount.current && permission === "granted") {
			const newMessages = unreadCount - previousCount.current;

			showNotification(
				newMessages === 1 ? "Nuevo mensaje" : `${newMessages} mensajes nuevos`,
				{
					body: "Tienes mensajes sin leer en Flatmatch",
					requireInteraction: false,
					silent: false,
					tag: "chat-message", // Agrupa notificaciones del mismo tipo
				},
			);

			// Reproducir sonido si está permitido
			if (typeof Audio !== "undefined") {
				try {
					const audio = new Audio("/notification.mp3");
					audio.volume = 0.3;
					audio.play().catch(() => {
						// Ignorar errores de autoplay
					});
				} catch {
					// Audio no disponible
				}
			}
		}

		previousCount.current = unreadCount;
	}, [unreadCount, showNotification, permission]);

	return { unreadCount };
}
