/**
 * Hook para solicitar permiso de notificaciones del navegador
 * Funciona sin backend, solo usa Notifications API nativa
 */
export function useNotificationPermission() {
	const isBrowser = typeof window !== "undefined";
	const isSupported = isBrowser && "Notification" in window;

	const getPermission = (): NotificationPermission => {
		if (!isSupported) {
			return "default";
		}
		return window.Notification.permission;
	};

	const requestPermission = async (): Promise<NotificationPermission> => {
		if (!isSupported) {
			console.warn("Este navegador no soporta notificaciones");
			return "denied";
		}

		if (window.Notification.permission === "granted") {
			return "granted";
		}

		if (window.Notification.permission !== "denied") {
			const permission = await window.Notification.requestPermission();
			return permission;
		}

		return window.Notification.permission;
	};

	const showNotification = (title: string, options?: NotificationOptions) => {
		if (!isSupported) {
			return;
		}

		if (window.Notification.permission === "granted") {
			new window.Notification(title, {
				badge: "/favicon.ico",
				icon: "/favicon.ico",
				...options,
			});
		}
	};

	return {
		isSupported,
		permission: getPermission(),
		requestPermission,
		showNotification,
	};
}
