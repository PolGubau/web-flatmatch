import { useEffect, useState } from "react";

/**
 * Hook to monitor page visibility state
 * Useful for pausing expensive operations when the tab is not visible
 * 
 * @returns Whether the page is currently visible
 * 
 * @example
 * const isVisible = usePageVisibility();
 * 
 * useEffect(() => {
 *   if (!isVisible) {
 *     // Pause animations or stop polling
 *     return;
 *   }
 *   // Resume operations
 * }, [isVisible]);
 */
export function usePageVisibility() {
	const [isVisible, setIsVisible] = useState(!document.hidden);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsVisible(!document.hidden);
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return isVisible;
}

/**
 * Hook to track when page becomes visible or hidden
 * Provides callbacks for both states
 * 
 * @param onVisible - Callback when page becomes visible
 * @param onHidden - Callback when page becomes hidden
 * 
 * @example
 * usePageVisibilityChange(
 *   () => console.log('Page is visible, resume polling'),
 *   () => console.log('Page is hidden, pause polling')
 * );
 */
export function usePageVisibilityChange(
	onVisible?: () => void,
	onHidden?: () => void,
) {
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				onHidden?.();
			} else {
				onVisible?.();
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [onVisible, onHidden]);
}

/**
 * Get current page visibility state
 */
export function getPageVisibility(): DocumentVisibilityState {
	if (typeof document === "undefined") {
		return "visible";
	}
	return document.visibilityState;
}

/**
 * Check if page is currently visible
 */
export function isPageVisible(): boolean {
	return getPageVisibility() === "visible";
}

/**
 * Check if page is currently hidden
 */
export function isPageHidden(): boolean {
	return getPageVisibility() === "hidden";
}
