/**
 * Vibration API utilities
 * Provides haptic feedback for user interactions
 * 
 * Note: Vibration API is supported on mobile browsers (Chrome, Firefox, Edge on Android)
 * and will gracefully fail on unsupported browsers
 */

/**
 * Check if Vibration API is supported
 */
export function isVibrationSupported(): boolean {
	return typeof window !== "undefined" && "vibrate" in navigator;
}

/**
 * Vibrate device with a pattern
 * @param pattern - Number (duration in ms) or array of numbers (vibrate, pause, vibrate, ...)
 * @returns true if vibration was triggered, false otherwise
 * 
 * @example
 * vibrate(200); // Single vibration for 200ms
 * vibrate([100, 50, 100]); // Vibrate 100ms, pause 50ms, vibrate 100ms
 */
export function vibrate(pattern: number | number[]): boolean {
	if (!isVibrationSupported()) {
		return false;
	}

	try {
		return navigator.vibrate(pattern);
	} catch (error) {
		console.warn("Vibration failed:", error);
		return false;
	}
}

/**
 * Stop any ongoing vibration
 */
export function stopVibration(): boolean {
	return vibrate(0);
}

/**
 * Predefined vibration patterns for common interactions
 */
export const VibrationPatterns = {
	/** Quick tap feedback - 10ms */
	TAP: 10,
	
	/** Short feedback - 50ms */
	SHORT: 50,
	
	/** Medium feedback - 100ms */
	MEDIUM: 100,
	
	/** Long feedback - 200ms */
	LONG: 200,
	
	/** Success pattern - quick double tap */
	SUCCESS: [50, 50, 50] as number[],
	
	/** Error pattern - long buzz */
	ERROR: [200, 100, 200] as number[],
	
	/** Notification pattern - gentle buzz */
	NOTIFICATION: [100, 50, 100, 50, 100] as number[],
	
	/** Like/favorite pattern - heartbeat */
	LIKE: [30, 30, 60] as number[],
	
	/** Swipe pattern - quick tap */
	SWIPE: 20,
	
	/** Button press - very short */
	BUTTON: 15,
} as const;

/**
 * Convenience functions for common vibration patterns
 */
export const vibrateSuccess = () => vibrate(VibrationPatterns.SUCCESS);
export const vibrateError = () => vibrate(VibrationPatterns.ERROR);
export const vibrateNotification = () => vibrate(VibrationPatterns.NOTIFICATION);
export const vibrateLike = () => vibrate(VibrationPatterns.LIKE);
export const vibrateSwipe = () => vibrate(VibrationPatterns.SWIPE);
export const vibrateTap = () => vibrate(VibrationPatterns.TAP);
export const vibrateButton = () => vibrate(VibrationPatterns.BUTTON);
