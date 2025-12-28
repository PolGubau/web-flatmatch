import { useEffect, useRef, useState } from "react";

/**
 * Check if Broadcast Channel API is supported
 */
export function isBroadcastChannelSupported(): boolean {
	return typeof window !== "undefined" && "BroadcastChannel" in window;
}

/**
 * Hook to use Broadcast Channel API for cross-tab communication
 * 
 * @param channelName - Name of the broadcast channel
 * @returns Object with postMessage function and latest message
 * 
 * @example
 * // In one tab/component:
 * const { postMessage } = useBroadcastChannel('room-updates');
 * postMessage({ type: 'ROOM_FAVORITED', roomId: '123' });
 * 
 * // In another tab/component:
 * const { message } = useBroadcastChannel('room-updates');
 * useEffect(() => {
 *   if (message?.type === 'ROOM_FAVORITED') {
 *     console.log('Room favorited in another tab:', message.roomId);
 *   }
 * }, [message]);
 */
export function useBroadcastChannel<T = any>(channelName: string) {
	const [message, setMessage] = useState<T | null>(null);
	const [isSupported] = useState(isBroadcastChannelSupported);
	const channelRef = useRef<BroadcastChannel | null>(null);

	useEffect(() => {
		if (!isSupported) {
			console.warn("BroadcastChannel API is not supported");
			return;
		}

		// Create channel
		const channel = new BroadcastChannel(channelName);
		channelRef.current = channel;

		// Listen for messages
		const handleMessage = (event: MessageEvent<T>) => {
			setMessage(event.data);
		};

		channel.addEventListener("message", handleMessage);

		// Cleanup
		return () => {
			channel.removeEventListener("message", handleMessage);
			channel.close();
			channelRef.current = null;
		};
	}, [channelName, isSupported]);

	const postMessage = (data: T) => {
		if (!channelRef.current) {
			console.warn("BroadcastChannel not initialized");
			return;
		}

		try {
			channelRef.current.postMessage(data);
		} catch (error) {
			console.error("Failed to post message to broadcast channel:", error);
		}
	};

	return {
		/** Latest received message */
		message,
		/** Function to post a message to all tabs */
		postMessage,
		/** Whether BroadcastChannel API is supported */
		isSupported,
	};
}

/**
 * Common broadcast channel names for the app
 */
export const BroadcastChannels = {
	/** Authentication state changes */
	AUTH: "flatmatch-auth",
	/** Room favorites/likes updates */
	ROOMS: "flatmatch-rooms",
	/** Chat/message updates */
	CHAT: "flatmatch-chat",
	/** User profile updates */
	PROFILE: "flatmatch-profile",
	/** General app state */
	APP: "flatmatch-app",
} as const;

/**
 * Message types for broadcast channels
 */
export type BroadcastMessage = 
	| { type: "AUTH_LOGIN"; userId: string }
	| { type: "AUTH_LOGOUT" }
	| { type: "ROOM_FAVORITED"; roomId: string }
	| { type: "ROOM_UNFAVORITED"; roomId: string }
	| { type: "MESSAGE_RECEIVED"; conversationId: string }
	| { type: "PROFILE_UPDATED"; userId: string }
	| { type: "THEME_CHANGED"; theme: string };

/**
 * Create a typed broadcast channel hook
 */
export function useTypedBroadcastChannel(channelName: string) {
	return useBroadcastChannel<BroadcastMessage>(channelName);
}
