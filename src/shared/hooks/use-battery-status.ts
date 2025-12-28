import { useEffect, useState } from "react";

/**
 * Battery status information
 * 
 * Note: Battery Status API has been deprecated in many browsers (including Firefox)
 * for privacy reasons. It may have limited availability. Use with graceful fallbacks.
 */
export interface BatteryStatus {
	/** Whether battery API is supported */
	supported: boolean;
	/** Battery charge level (0 to 1) */
	level: number | null;
	/** Whether device is charging */
	charging: boolean | null;
	/** Time until fully charged (seconds, Infinity if not charging) */
	chargingTime: number | null;
	/** Time until battery is empty (seconds, Infinity if charging) */
	dischargingTime: number | null;
}

/**
 * Get battery status from navigator
 */
async function getBatteryStatus(): Promise<BatteryStatus> {
	if (typeof window === "undefined" || !(navigator as any).getBattery) {
		return {
			supported: false,
			level: null,
			charging: null,
			chargingTime: null,
			dischargingTime: null,
		};
	}

	try {
		const battery = await (navigator as any).getBattery();
		return {
			supported: true,
			level: battery.level,
			charging: battery.charging,
			chargingTime: battery.chargingTime,
			dischargingTime: battery.dischargingTime,
		};
	} catch (error) {
		console.warn("Failed to get battery status:", error);
		return {
			supported: false,
			level: null,
			charging: null,
			chargingTime: null,
			dischargingTime: null,
		};
	}
}

/**
 * Hook to monitor device battery status
 * 
 * @returns Battery status including level, charging state, and time estimates
 * 
 * @example
 * const { level, charging, supported } = useBatteryStatus();
 * 
 * if (supported && level !== null && level < 0.2 && !charging) {
 *   console.log('Low battery detected, reducing animations');
 * }
 */
export function useBatteryStatus() {
	const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
		supported: false,
		level: null,
		charging: null,
		chargingTime: null,
		dischargingTime: null,
	});

	useEffect(() => {
		if (typeof window === "undefined" || !(navigator as any).getBattery) {
			return;
		}

		let battery: any = null;

		const updateBatteryStatus = () => {
			if (battery) {
				setBatteryStatus({
					supported: true,
					level: battery.level,
					charging: battery.charging,
					chargingTime: battery.chargingTime,
					dischargingTime: battery.dischargingTime,
				});
			}
		};

		// Initialize battery
		(navigator as any).getBattery().then((b: any) => {
			battery = b;
			updateBatteryStatus();

			// Add event listeners
			battery.addEventListener("chargingchange", updateBatteryStatus);
			battery.addEventListener("levelchange", updateBatteryStatus);
			battery.addEventListener("chargingtimechange", updateBatteryStatus);
			battery.addEventListener("dischargingtimechange", updateBatteryStatus);
		}).catch((error: Error) => {
			console.warn("Failed to initialize battery monitoring:", error);
		});

		// Cleanup
		return () => {
			if (battery) {
				battery.removeEventListener("chargingchange", updateBatteryStatus);
				battery.removeEventListener("levelchange", updateBatteryStatus);
				battery.removeEventListener("chargingtimechange", updateBatteryStatus);
				battery.removeEventListener("dischargingtimechange", updateBatteryStatus);
			}
		};
	}, []);

	return batteryStatus;
}

/**
 * Utility functions for battery status
 */

/**
 * Check if battery is low (below 20%)
 */
export function isBatteryLow(level: number | null): boolean {
	return level !== null && level < 0.2;
}

/**
 * Check if battery is critical (below 10%)
 */
export function isBatteryCritical(level: number | null): boolean {
	return level !== null && level < 0.1;
}

/**
 * Get battery percentage as string
 */
export function getBatteryPercentage(level: number | null): string {
	if (level === null) {
		return "N/A";
	}
	return `${Math.round(level * 100)}%`;
}

/**
 * Get user-friendly battery status message
 */
export function getBatteryStatusMessage(status: BatteryStatus): string {
	if (!status.supported || status.level === null) {
		return "Battery status unavailable";
	}

	const percentage = Math.round(status.level * 100);

	if (status.charging) {
		return `Charging (${percentage}%)`;
	}

	if (isBatteryCritical(status.level)) {
		return `Critical battery level (${percentage}%)`;
	}

	if (isBatteryLow(status.level)) {
		return `Low battery (${percentage}%)`;
	}

	return `Battery at ${percentage}%`;
}

/**
 * Check if device should use power-saving mode
 */
export function shouldUsePowerSaving(status: BatteryStatus): boolean {
	return (
		status.supported &&
		status.level !== null &&
		status.level < 0.3 &&
		status.charging === false
	);
}
