/**
 * Browser APIs Demo Component
 * Showcases all available browser APIs implemented in Flatmatch
 */

import { useState } from "react";
import {
	useBatteryStatus,
	useNetworkStatus,
	useWakeLock,
	useDeviceOrientation,
	usePageVisibility,
	useBroadcastChannel,
	vibrate,
	VibrationPatterns,
	getBatteryPercentage,
	getNetworkStatusMessage,
	getCompassDirection,
} from "~/shared/utils/browser-apis";

export default function BrowserAPIsDemo() {
	const [wakeLockEnabled, setWakeLockEnabled] = useState(false);
	const [orientationEnabled, setOrientationEnabled] = useState(false);

	// Use all the hooks
	const battery = useBatteryStatus();
	const network = useNetworkStatus();
	const { isActive: wakeLockActive, isSupported: wakeLockSupported } = useWakeLock(wakeLockEnabled);
	const orientation = useDeviceOrientation(orientationEnabled);
	const isPageVisible = usePageVisibility();
	const { postMessage, message } = useBroadcastChannel("demo-channel");

	const SECONDS_PER_MINUTE = 60;

	const handleVibration = (pattern: number | number[]) => {
		vibrate(pattern);
	};

	const handleBroadcast = () => {
		postMessage({ type: "TEST", timestamp: Date.now() });
	};

	return (
		<div className="p-6 space-y-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-4">🚀 Browser APIs Demo</h1>
			<p className="text-muted-foreground mb-8">
				This page demonstrates all the cool browser APIs implemented in Flatmatch.
			</p>

			{/* Battery Status */}
			<section className="border rounded-lg p-4 space-y-2">
				<h2 className="text-xl font-semibold">🔋 Battery Status API</h2>
				{battery.supported ? (
					<div className="space-y-1 text-sm">
						<p>Level: {getBatteryPercentage(battery.level)}</p>
						<p>Charging: {battery.charging ? "Yes ⚡" : "No"}</p>
						{battery.dischargingTime && battery.dischargingTime !== Infinity && (
							<p>Time remaining: {Math.round(battery.dischargingTime / SECONDS_PER_MINUTE)} minutes</p>
						)}
					</div>
				) : (
					<p className="text-muted-foreground">Not supported on this browser</p>
				)}
			</section>

			{/* Network Information */}
			<section className="border rounded-lg p-4 space-y-2">
				<h2 className="text-xl font-semibold">📡 Network Information API</h2>
				<div className="space-y-1 text-sm">
					<p>Status: {getNetworkStatusMessage(network)}</p>
					<p>Online: {network.online ? "Yes ✅" : "No ❌"}</p>
					{network.effectiveType && (
						<p>Connection Type: {network.effectiveType.toUpperCase()}</p>
					)}
					{network.downlink && (
						<p>Download Speed: ~{network.downlink} Mbps</p>
					)}
					{network.rtt && (
						<p>Round Trip Time: {network.rtt}ms</p>
					)}
					{network.saveData && (
						<p className="text-warning">Data Saver Mode Enabled</p>
					)}
				</div>
			</section>

			{/* Vibration API */}
			<section className="border rounded-lg p-4 space-y-2">
				<h2 className="text-xl font-semibold">📳 Vibration API</h2>
				<p className="text-sm text-muted-foreground mb-2">
					Try these vibration patterns (works on mobile devices):
				</p>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						className="px-3 py-1 bg-primary text-primary-foreground rounded"
						onClick={() => handleVibration(VibrationPatterns.TAP)}
					>
						Tap
					</button>
					<button
						type="button"
						className="px-3 py-1 bg-primary text-primary-foreground rounded"
						onClick={() => handleVibration(VibrationPatterns.LIKE)}
					>
						Like ❤️
					</button>
					<button
						type="button"
						className="px-3 py-1 bg-primary text-primary-foreground rounded"
						onClick={() => handleVibration(VibrationPatterns.SUCCESS)}
					>
						Success ✅
					</button>
					<button
						type="button"
						className="px-3 py-1 bg-primary text-primary-foreground rounded"
						onClick={() => handleVibration(VibrationPatterns.ERROR)}
					>
						Error ❌
					</button>
					<button
						type="button"
						className="px-3 py-1 bg-primary text-primary-foreground rounded"
						onClick={() => handleVibration(VibrationPatterns.NOTIFICATION)}
					>
						Notification 🔔
					</button>
				</div>
			</section>

			{/* Screen Wake Lock */}
			<section className="border rounded-lg p-4 space-y-2">
				<h2 className="text-xl font-semibold">🔆 Screen Wake Lock API</h2>
				{wakeLockSupported ? (
					<div className="space-y-2">
						<p className="text-sm">
							Keep screen awake: {wakeLockActive ? "Active ✅" : "Inactive"}
						</p>
						<button
							type="button"
							className="px-4 py-2 bg-primary text-primary-foreground rounded"
							onClick={() => setWakeLockEnabled(!wakeLockEnabled)}
						>
							{wakeLockEnabled ? "Release Wake Lock" : "Request Wake Lock"}
						</button>
					</div>
				) : (
					<p className="text-muted-foreground">Not supported on this browser</p>
				)}
			</section>

			{/* Device Orientation */}
			<section className="border rounded-lg p-4 space-y-2">
				<h2 className="text-xl font-semibold">📱 Device Orientation API</h2>
				{orientation.isSupported ? (
					<div className="space-y-2">
						<button
							type="button"
							className="px-4 py-2 bg-primary text-primary-foreground rounded mb-2"
							onClick={() => setOrientationEnabled(!orientationEnabled)}
						>
							{orientationEnabled ? "Stop Monitoring" : "Start Monitoring"}
						</button>
						{orientationEnabled && (
							<div className="space-y-1 text-sm">
								<p>Alpha (compass): {orientation.alpha?.toFixed(0)}° - {getCompassDirection(orientation.alpha)}</p>
								<p>Beta (forward/back tilt): {orientation.beta?.toFixed(0)}°</p>
								<p>Gamma (left/right tilt): {orientation.gamma?.toFixed(0)}°</p>
								{orientation.hasPermission === false && (
									<p className="text-warning">Permission denied</p>
								)}
							</div>
						)}
					</div>
				) : (
					<p className="text-muted-foreground">Not supported on this browser</p>
				)}
			</section>

			{/* Page Visibility */}
			<section className="border rounded-lg p-4 space-y-2">
				<h2 className="text-xl font-semibold">👁️ Page Visibility API</h2>
				<p className="text-sm">
					Page is currently: {isPageVisible ? "Visible ✅" : "Hidden 🔒"}
				</p>
				<p className="text-xs text-muted-foreground">
					Try switching to another tab to see this change
				</p>
			</section>

			{/* Broadcast Channel */}
			<section className="border rounded-lg p-4 space-y-2">
				<h2 className="text-xl font-semibold">📢 Broadcast Channel API</h2>
				<p className="text-sm text-muted-foreground mb-2">
					Send messages between browser tabs
				</p>
				<button
					type="button"
					className="px-4 py-2 bg-primary text-primary-foreground rounded"
					onClick={handleBroadcast}
				>
					Send Test Message
				</button>
				{message && (
					<div className="mt-2 p-2 bg-muted rounded text-sm">
						<p>Last message received:</p>
						<pre>{JSON.stringify(message, null, 2)}</pre>
					</div>
				)}
				<p className="text-xs text-muted-foreground">
					Open this page in multiple tabs to test cross-tab communication
				</p>
			</section>

			{/* Summary */}
			<section className="border-t pt-6">
				<h2 className="text-xl font-semibold mb-2">✨ Summary</h2>
				<p className="text-sm text-muted-foreground">
					All these browser APIs are now available throughout the Flatmatch app to enhance
					the user experience with haptic feedback, smart performance adjustments based on
					battery and network conditions, screen wake lock for viewing room photos, device
					orientation for interactive features, and cross-tab synchronization.
				</p>
			</section>
		</div>
	);
}
