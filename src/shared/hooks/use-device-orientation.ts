import { useEffect, useState } from "react";

/**
 * Device orientation information
 */
export interface DeviceOrientation {
	/** Alpha: rotation around z-axis (0-360 degrees) */
	alpha: number | null;
	/** Beta: rotation around x-axis (-180 to 180 degrees) */
	beta: number | null;
	/** Gamma: rotation around y-axis (-90 to 90 degrees) */
	gamma: number | null;
	/** Whether the device provides absolute orientation values */
	absolute: boolean;
}

/**
 * Hook to monitor device orientation (tilt and rotation)
 * 
 * @param enabled - Whether to actively listen for orientation changes
 * @returns Device orientation data (alpha, beta, gamma)
 * 
 * @example
 * const { alpha, beta, gamma } = useDeviceOrientation(true);
 * 
 * // Use beta for forward/backward tilt
 * // Use gamma for left/right tilt
 * // Use alpha for compass direction
 */
export function useDeviceOrientation(enabled: boolean = true) {
	const [orientation, setOrientation] = useState<DeviceOrientation>({
		alpha: null,
		beta: null,
		gamma: null,
		absolute: false,
	});

	const [isSupported, setIsSupported] = useState(false);
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);

	useEffect(() => {
		// Check if API is supported
		if (typeof window === "undefined" || !window.DeviceOrientationEvent) {
			setIsSupported(false);
			return;
		}

		setIsSupported(true);

		if (!enabled) {
			return;
		}

		// iOS 13+ requires permission for motion sensors
		const requestPermission = async () => {
			if (
				typeof (DeviceOrientationEvent as any).requestPermission === "function"
			) {
				try {
					const permission = await (DeviceOrientationEvent as any).requestPermission();
					setHasPermission(permission === "granted");
					return permission === "granted";
				} catch (error) {
					console.error("Device orientation permission denied:", error);
					setHasPermission(false);
					return false;
				}
			} else {
				// Permission not needed for this browser
				setHasPermission(true);
				return true;
			}
		};

		const handleOrientation = (event: DeviceOrientationEvent) => {
			setOrientation({
				alpha: event.alpha,
				beta: event.beta,
				gamma: event.gamma,
				absolute: event.absolute,
			});
		};

		const initOrientation = async () => {
			const permitted = await requestPermission();
			if (permitted) {
				window.addEventListener("deviceorientation", handleOrientation);
			}
		};

		initOrientation();

		return () => {
			window.removeEventListener("deviceorientation", handleOrientation);
		};
	}, [enabled]);

	return {
		...orientation,
		/** Whether the API is supported */
		isSupported,
		/** Whether permission has been granted (null if not yet requested) */
		hasPermission,
	};
}

/**
 * Request permission for device orientation (required on iOS 13+)
 */
export async function requestOrientationPermission(): Promise<boolean> {
	if (typeof window === "undefined" || !window.DeviceOrientationEvent) {
		return false;
	}

	if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
		try {
			const permission = await (DeviceOrientationEvent as any).requestPermission();
			return permission === "granted";
		} catch (error) {
			console.error("Failed to request orientation permission:", error);
			return false;
		}
	}

	// Permission not needed
	return true;
}

/**
 * Utility functions for device orientation
 */

/**
 * Check if device is in landscape mode (tilted left or right)
 */
export function isLandscape(gamma: number | null): boolean {
	if (gamma === null) return false;
	return Math.abs(gamma) > 45;
}

/**
 * Check if device is in portrait mode (upright)
 */
export function isPortrait(gamma: number | null): boolean {
	if (gamma === null) return false;
	return Math.abs(gamma) <= 45;
}

/**
 * Check if device is tilted forward
 */
export function isTiltedForward(beta: number | null): boolean {
	if (beta === null) return false;
	return beta > 45;
}

/**
 * Check if device is tilted backward
 */
export function isTiltedBackward(beta: number | null): boolean {
	if (beta === null) return false;
	return beta < -45;
}

/**
 * Get compass direction as string (N, NE, E, SE, S, SW, W, NW)
 */
export function getCompassDirection(alpha: number | null): string {
	if (alpha === null) return "Unknown";

	const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	const index = Math.round(alpha / 45) % 8;
	return directions[index];
}

/**
 * Normalize orientation values for easier use
 * Returns values between -1 and 1
 */
export function normalizeOrientation(orientation: DeviceOrientation) {
	return {
		// Tilt left/right (-1 = left, 1 = right)
		tiltX: orientation.gamma !== null ? orientation.gamma / 90 : 0,
		// Tilt forward/backward (-1 = backward, 1 = forward)
		tiltY: orientation.beta !== null ? orientation.beta / 180 : 0,
		// Rotation/compass (0-1 for 0-360 degrees)
		rotation: orientation.alpha !== null ? orientation.alpha / 360 : 0,
	};
}
