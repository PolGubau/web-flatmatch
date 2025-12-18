"use client";

 import { useCallback, useEffect, useState } from "react";
import { supabase } from "~/global/supabase/client";

interface UseRealtimeChatProps {
	roomName: string;
	username: string;
}

export interface ChatMessage {
	id: string;
	content: string;
	user: {
		name: string;
	};
	createdAt: string;
}

const EVENT_MESSAGE_TYPE = "message";

export function useRealtimeChat({ roomName, username }: UseRealtimeChatProps) {
 	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [channel, setChannel] = useState<ReturnType<
		typeof supabase.channel
	> | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const newChannel = supabase.channel(roomName);

		newChannel
			.on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
				setMessages((current) => [...current, payload.payload as ChatMessage]);
			})
			.subscribe(async (status) => {
				if (status === "SUBSCRIBED") {
					setIsConnected(true);
				} else {
					setIsConnected(false);
				}
			});

		setChannel(newChannel);

		return () => {
			supabase.removeChannel(newChannel);
		};
	}, [roomName, username, supabase]);

	const sendMessage = useCallback(
		async (content: string) => {
			if (!channel || !isConnected) return;

			const message: ChatMessage = {
				content,
				createdAt: new Date().toISOString(),
				id: crypto.randomUUID(),
				user: {
					name: username,
				},
			};

			// Update local state immediately for the sender
			setMessages((current) => [...current, message]);

			await channel.send({
				event: EVENT_MESSAGE_TYPE,
				payload: message,
				type: "broadcast",
			});
		},
		[channel, isConnected, username],
	);

	return { isConnected, messages, sendMessage };
}
