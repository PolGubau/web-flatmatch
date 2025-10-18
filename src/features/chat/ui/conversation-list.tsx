import { Loading01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useConversationsQuery } from "../model/queries/conversations.query";
import { ConversationItem } from "./conversation-item";

interface ConversationListProps {
	activeConversationId: string | null;
	onSelectConversation: (conversationId: string) => void;
}

export function ConversationList({
	activeConversationId,
	onSelectConversation,
}: ConversationListProps) {
	const { data: conversations, isLoading } = useConversationsQuery();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<HugeiconsIcon
					className="animate-spin"
					icon={Loading01Icon}
					size={32}
				/>
			</div>
		);
	}

	if (!conversations || conversations.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-center p-8">
				<p className="text-neutral-500">No tienes conversaciones aún</p>
				<p className="text-sm text-neutral-400 mt-2">
					Envía un mensaje desde el detalle de una habitación
				</p>
			</div>
		);
	}

	return (
		<div className="h-full overflow-y-auto">
			{conversations.map((conversation) => (
				<ConversationItem
					conversation={conversation}
					isActive={conversation.id === activeConversationId}
					key={conversation.id}
					onClick={() => onSelectConversation(conversation.id)}
				/>
			))}
		</div>
	);
}
