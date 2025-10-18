import { Loading01Icon, Sent02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "~/shared/context/session-context";
import {
	useMarkAsReadMutation,
	useSendMessageMutation,
} from "../model/mutations/chat.mutations";
import { useMessagesQuery } from "../model/queries/messages.query";
import { MessageBubble } from "./message-bubble";

interface ChatWindowProps {
	conversationId: string | null;
	otherParticipantName?: string;
}

export function ChatWindow({
	conversationId,
	otherParticipantName,
}: ChatWindowProps) {
	const { session } = useSession();
	const [inputValue, setInputValue] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { data: messages, isLoading } = useMessagesQuery(conversationId);
	const sendMessage = useSendMessageMutation(conversationId || "");
	const markAsRead = useMarkAsReadMutation();

	// Scroll al final cuando hay nuevos mensajes
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Marcar como leídos al abrir la conversación
	useEffect(() => {
		if (conversationId) {
			markAsRead.mutate(conversationId);
		}
	}, [conversationId]);

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputValue.trim() || !conversationId) return;

		sendMessage.mutate(inputValue, {
			onSuccess: () => {
				setInputValue("");
			},
		});
	};

	if (!conversationId) {
		return (
			<div className="h-full flex items-center justify-center text-neutral-500">
				<p>Selecciona una conversación para empezar</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<HugeiconsIcon
					className="animate-spin"
					icon={Loading01Icon}
					size={32}
				/>
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col">
			{/* Header */}
			{otherParticipantName && (
				<div className="border-b border-neutral-200 dark:border-neutral-700 p-4">
					<h2 className="font-semibold">{otherParticipantName}</h2>
				</div>
			)}

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4">
				{messages && messages.length === 0 ? (
					<div className="h-full flex items-center justify-center text-neutral-500">
						<p>No hay mensajes aún. ¡Envía el primero!</p>
					</div>
				) : (
					<>
						{messages?.map((message) => (
							<MessageBubble
								isOwn={message.senderId === session?.user.id}
								key={message.id}
								message={message}
							/>
						))}
						<div ref={messagesEndRef} />
					</>
				)}
			</div>

			{/* Input */}
			<form
				className="border-t border-neutral-200 dark:border-neutral-700 p-4 flex gap-2"
				onSubmit={handleSend}
			>
				<input
					className="flex-1 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
					disabled={sendMessage.isPending}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Escribe un mensaje..."
					type="text"
					value={inputValue}
				/>
				<button
					className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					disabled={!inputValue.trim() || sendMessage.isPending}
					type="submit"
				>
					{sendMessage.isPending ? (
						<HugeiconsIcon className="animate-spin" icon={Loading01Icon} />
					) : (
						<HugeiconsIcon icon={Sent02Icon} />
					)}
				</button>
			</form>
		</div>
	);
}
