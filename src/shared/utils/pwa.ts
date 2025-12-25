/**
 * Service Worker Registration
 * Registers the service worker for PWA functionality
 */

export function registerServiceWorker() {
	if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
		return;
	}

	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then((registration) => {
				console.log(
					"✅ Service Worker registered successfully:",
					registration.scope,
				);

				// Check for updates periodically
				setInterval(() => {
					registration.update();
				}, 60000); // Check every minute

				// Listen for new service worker
				registration.addEventListener("updatefound", () => {
					const newWorker = registration.installing;
					if (!newWorker) return;

					newWorker.addEventListener("statechange", () => {
						if (
							newWorker.state === "installed" &&
							navigator.serviceWorker.controller
						) {
							// New service worker available, show update prompt
							showUpdateNotification();
						}
					});
				});
			})
			.catch((error) => {
				console.error("❌ Service Worker registration failed:", error);
			});

		// Handle controller change (new SW activated)
		navigator.serviceWorker.addEventListener("controllerchange", () => {
			window.location.reload();
		});
	});
}

function showUpdateNotification() {
	if (confirm("A new version of Flatmatch is available! Reload to update?")) {
		window.location.reload();
	}
}

/**
 * Request notification permission for PWA
 */
export async function requestNotificationPermission(): Promise<boolean> {
	if (!("Notification" in window)) {
		return false;
	}

	if (Notification.permission === "granted") {
		return true;
	}

	if (Notification.permission !== "denied") {
		const permission = await Notification.requestPermission();
		return permission === "granted";
	}

	return false;
}

/**
 * Check if app is installed as PWA
 */
export function isPWA(): boolean {
	if (typeof window === "undefined") {
		return false;
	}

	return (
		window.matchMedia("(display-mode: standalone)").matches ||
		(window.navigator as any).standalone === true ||
		document.referrer.includes("android-app://")
	);
}

/**
 * Prompt user to install PWA
 */
let deferredPrompt: any;

export function setupInstallPrompt() {
	if (typeof window === "undefined") {
		return;
	}

	window.addEventListener("beforeinstallprompt", (e) => {
		// Prevent the mini-infobar from appearing
		e.preventDefault();
		// Stash the event so it can be triggered later
		deferredPrompt = e;
		// Show install button/banner
		showInstallPromotion();
	});

	window.addEventListener("appinstalled", () => {
		console.log("✅ PWA installed successfully");
		deferredPrompt = null;
	});
}

export async function promptInstall() {
	if (!deferredPrompt) {
		return false;
	}

	// Show the install prompt
	deferredPrompt.prompt();

	// Wait for the user to respond to the prompt
	const { outcome } = await deferredPrompt.userChoice;

	console.log(`User response: ${outcome}`);

	// Clear the deferredPrompt
	deferredPrompt = null;

	return outcome === "accepted";
}

function showInstallPromotion() {
	// Show your custom install UI
	console.log("💡 Show install promotion");
	// You can trigger a banner, button, or modal here
}
