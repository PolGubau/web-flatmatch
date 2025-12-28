import { useEffect, useRef, useState } from "react";

/**
 * Screen Wake Lock API utilities
 * Prevents the screen from turning off while viewing content
 */

/**
 * Check if Screen Wake Lock API is supported
 */
export function isWakeLockSupported(): boolean {
	return typeof window !== "undefined" && "wakeLock" in navigator;
}

/**
 * Request a screen wake lock
 * @returns WakeLockSentinel or null if not supported/failed
 */
export async function requestWakeLock(): Promise<WakeLockSentinel | null> {
	if (!isWakeLockSupported()) {
		console.warn("Screen Wake Lock API is not supported");
		return null;
	}

	try {
		const wakeLock = await navigator.wakeLock.request("screen");
		console.log("✅ Screen wake lock acquired");
		return wakeLock;
	} catch (error) {
		console.error("❌ Failed to acquire wake lock:", error);
		return null;
	}
}

/**
 * Release a screen wake lock
 */
export async function releaseWakeLock(wakeLock: WakeLockSentinel | null): Promise<void> {
	if (!wakeLock) {
		return;
	}

	try {
		await wakeLock.release();
		console.log("✅ Screen wake lock released");
	} catch (error) {
		console.error("❌ Failed to release wake lock:", error);
	}
}

/**
 * Hook to manage screen wake lock
 * Automatically acquires wake lock when enabled and releases when disabled or component unmounts
 * 
 * @param enabled - Whether to keep the screen awake
 * @returns Object with wakeLock state and manual control functions
 * 
 * @example
 * const { isActive, request, release } = useWakeLock(isViewingPhotos);
 */
export function useWakeLock(enabled: boolean = false) {
	const [isActive, setIsActive] = useState(false);
	const wakeLockRef = useRef<WakeLockSentinel | null>(null);

	const request = async () => {
		if (wakeLockRef.current) {
			return; // Already active
		}

		const wakeLock = await requestWakeLock();
		if (wakeLock) {
			wakeLockRef.current = wakeLock;
			setIsActive(true);

			// Handle wake lock release (e.g., when tab becomes inactive)
			wakeLock.addEventListener("release", () => {
				console.log("Wake lock was released");
				setIsActive(false);
				wakeLockRef.current = null;
			});
		}
	};

	const release = async () => {
		if (wakeLockRef.current) {
			await releaseWakeLock(wakeLockRef.current);
			wakeLockRef.current = null;
			setIsActive(false);
		}
	};

	useEffect(() => {
		if (enabled) {
			request();
		} else {
			release();
		}

		// Re-acquire wake lock when page becomes visible again
		const handleVisibilityChange = async () => {
			if (enabled && document.visibilityState === "visible" && !wakeLockRef.current) {
				await request();
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Cleanup on unmount
		return () => {
			release();
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [enabled]);

	return {
		/** Whether wake lock is currently active */
		isActive,
		/** Manually request wake lock */
		request,
		/** Manually release wake lock */
		release,
		/** Whether Wake Lock API is supported */
		isSupported: isWakeLockSupported(),
	};
}
