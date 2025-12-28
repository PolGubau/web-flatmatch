/**
 * Hook para solicitar permiso de notificaciones del navegador
 * Funciona sin backend, solo usa Notifications API nativa
 */
export function useNotificationPermission() {
	const requestPermission = async (): Promise<NotificationPermission> => {
		if (!("Notification" in window)) {
			console.warn("Este navegador no soporta notificaciones");
			return "denied";
		}

		if (Notification.permission === "granted") {
			return "granted";
		}

		if (Notification.permission !== "denied") {
			const permission = await Notification.requestPermission();
			return permission;
		}

		return Notification.permission;
	};

	const showNotification = (title: string, options?: NotificationOptions) => {
		if (Notification.permission === "granted") {
			new Notification(title, {
				badge: "/favicon.ico",
				icon: "/favicon.ico",
				...options,
			});
		}
	};

	return {
		isSupported: typeof window !== "undefined" && "Notification" in window,
		permission:
			typeof window !== "undefined" ? Notification.permission : "default",
		requestPermission,
		showNotification,
	};
}
