/**
 * Browser APIs - Modern Web APIs for Enhanced User Experience
 * 
 * This module provides React hooks and utilities for various browser APIs:
 * - Vibration API: Haptic feedback for user interactions
 * - Network Information API: Monitor connection quality
 * - Battery Status API: Check device battery level
 * - Screen Wake Lock API: Keep screen awake during important tasks
 * - Device Orientation API: Detect device tilt and rotation
 * - Page Visibility API: Detect when page is visible/hidden
 * - Broadcast Channel API: Cross-tab communication
 */

// Vibration API
export {
	vibrate,
	stopVibration,
	isVibrationSupported,
	VibrationPatterns,
	vibrateSuccess,
	vibrateError,
	vibrateNotification,
	vibrateLike,
	vibrateSwipe,
	vibrateTap,
	vibrateButton,
} from "./vibration";

// Network Information API
export {
	useNetworkStatus,
	isSlowConnection,
	isFastConnection,
	shouldReduceData,
	getNetworkStatusMessage,
	type NetworkInformation,
	type ConnectionType,
	type EffectiveType,
} from "../hooks/use-network-status";

// Battery Status API
export {
	useBatteryStatus,
	isBatteryLow,
	isBatteryCritical,
	getBatteryPercentage,
	getBatteryStatusMessage,
	shouldUsePowerSaving,
	type BatteryStatus,
} from "../hooks/use-battery-status";

// Screen Wake Lock API
export {
	useWakeLock,
	isWakeLockSupported,
	requestWakeLock,
	releaseWakeLock,
} from "../hooks/use-wake-lock";

// Device Orientation API
export {
	useDeviceOrientation,
	requestOrientationPermission,
	isLandscape,
	isPortrait,
	isTiltedForward,
	isTiltedBackward,
	getCompassDirection,
	normalizeOrientation,
	type DeviceOrientation,
} from "../hooks/use-device-orientation";

// Page Visibility API
export {
	usePageVisibility,
	usePageVisibilityChange,
	getPageVisibility,
	isPageVisible,
	isPageHidden,
} from "../hooks/use-page-visibility";

// Broadcast Channel API
export {
	useBroadcastChannel,
	useTypedBroadcastChannel,
	isBroadcastChannelSupported,
	BroadcastChannels,
	type BroadcastMessage,
} from "../hooks/use-broadcast-channel";
