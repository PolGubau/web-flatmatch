import { useEffect, useState } from "react";

/**
 * Network connection types
 */
export type ConnectionType = 
	| "slow-2g" 
	| "2g" 
	| "3g" 
	| "4g" 
	| "5g" 
	| "wifi" 
	| "ethernet" 
	| "unknown";

/**
 * Network effective types
 */
export type EffectiveType = "slow-2g" | "2g" | "3g" | "4g";

export interface NetworkInformation {
	/** Whether the device is online */
	online: boolean;
	/** Estimated downlink speed in Mbps */
	downlink?: number;
	/** Estimated round-trip time in ms */
	rtt?: number;
	/** Whether data saver mode is enabled */
	saveData?: boolean;
	/** Effective connection type */
	effectiveType?: EffectiveType;
	/** Actual connection type (if available) */
	type?: ConnectionType;
}

/**
 * Get network connection information from navigator
 */
function getNetworkInfo(): NetworkInformation {
	if (typeof window === "undefined" || !navigator) {
		return { online: true };
	}

	const connection = (navigator as any).connection 
		|| (navigator as any).mozConnection 
		|| (navigator as any).webkitConnection;

	return {
		online: navigator.onLine,
		downlink: connection?.downlink,
		rtt: connection?.rtt,
		saveData: connection?.saveData ?? false,
		effectiveType: connection?.effectiveType,
		type: connection?.type,
	};
}

/**
 * Hook to monitor network connection status and quality
 * 
 * @returns Network information including connection type, speed, and online status
 * 
 * @example
 * const { online, effectiveType, saveData } = useNetworkStatus();
 * 
 * if (!online) {
 *   return <div>You are offline</div>;
 * }
 * 
 * if (effectiveType === 'slow-2g' || effectiveType === '2g') {
 *   return <div>Slow connection detected</div>;
 * }
 */
export function useNetworkStatus() {
	const [networkInfo, setNetworkInfo] = useState<NetworkInformation>(getNetworkInfo);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const updateNetworkInfo = () => {
			setNetworkInfo(getNetworkInfo());
		};

		// Listen for online/offline events
		window.addEventListener("online", updateNetworkInfo);
		window.addEventListener("offline", updateNetworkInfo);

		// Listen for connection changes
		const connection = (navigator as any).connection 
			|| (navigator as any).mozConnection 
			|| (navigator as any).webkitConnection;

		if (connection) {
			connection.addEventListener("change", updateNetworkInfo);
		}

		// Cleanup
		return () => {
			window.removeEventListener("online", updateNetworkInfo);
			window.removeEventListener("offline", updateNetworkInfo);
			if (connection) {
				connection.removeEventListener("change", updateNetworkInfo);
			}
		};
	}, []);

	return networkInfo;
}

/**
 * Utility functions to check network quality
 */

export function isSlowConnection(effectiveType?: EffectiveType): boolean {
	return effectiveType === "slow-2g" || effectiveType === "2g";
}

export function isFastConnection(effectiveType?: EffectiveType): boolean {
	return effectiveType === "4g";
}

export function shouldReduceData(networkInfo: NetworkInformation): boolean {
	return (
		!networkInfo.online ||
		networkInfo.saveData === true ||
		isSlowConnection(networkInfo.effectiveType)
	);
}

/**
 * Get a user-friendly network status message
 */
export function getNetworkStatusMessage(networkInfo: NetworkInformation): string {
	if (!networkInfo.online) {
		return "You are offline";
	}

	if (networkInfo.saveData) {
		return "Data saver mode is enabled";
	}

	switch (networkInfo.effectiveType) {
		case "slow-2g":
			return "Very slow connection detected";
		case "2g":
			return "Slow connection detected";
		case "3g":
			return "Moderate connection";
		case "4g":
			return "Fast connection";
		default:
			return "Online";
	}
}
