import { useCallback } from "react";

type HapticStyle = "light" | "medium" | "heavy" | "rigid" | "soft";

/**
 * Hook to provide haptic feedback on supported devices
 * @returns Function to trigger haptic feedback
 *
 * @example
 * const triggerHaptic = useHapticFeedback();
 *
 * const handleClick = () => {
 *   triggerHaptic('light');
 *   // Handle click
 * };
 */
export const useHapticFeedback = () => {
	return useCallback((style: HapticStyle = "light") => {
		// Check if running in browser
		if (typeof window === "undefined") return;

		// Vibration API fallback
		if ("vibrate" in navigator) {
			const duration = {
				heavy: 50,
				light: 10,
				medium: 20,
				rigid: 15,
				soft: 5,
			}[style];

			navigator.vibrate(duration);
		}

		// iOS Haptic Feedback (if available through WebKit)
		// @ts-expect-error - webkit API not in types
		if (window.webkit?.messageHandlers?.hapticFeedback) {
			// @ts-expect-error - webkit API not in types
			window.webkit.messageHandlers.hapticFeedback.postMessage(style);
		}
	}, []);
};
