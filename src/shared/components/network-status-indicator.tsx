/**
 * Network Status Indicator
 * Displays a subtle indicator when network conditions are poor
 */

import { useNetworkStatus, getNetworkStatusMessage, shouldReduceData } from "~/shared/utils/browser-apis";

export function NetworkStatusIndicator() {
	const network = useNetworkStatus();

	// Only show indicator when there are network issues
	if (!shouldReduceData(network)) {
		return null;
	}

	return (
		<div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-in slide-in-from-bottom-5">
			<div className="bg-warning/90 backdrop-blur-sm text-warning-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
				<span className="text-lg">📡</span>
				<div className="flex-1">
					<p className="font-medium">{getNetworkStatusMessage(network)}</p>
					{!network.online && (
						<p className="text-xs opacity-90">Some features may not work</p>
					)}
					{network.saveData && (
						<p className="text-xs opacity-90">Using reduced data mode</p>
					)}
				</div>
			</div>
		</div>
	);
}
