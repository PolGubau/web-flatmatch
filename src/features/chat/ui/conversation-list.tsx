import { useConversationsQuery } from "../model/queries/use-conversations.query";
import { ConversationItem } from "./conversation-item";

interface ConversationListProps {
	currentUserId: string;
	activeConversationId: string | null;
	onSelectConversation: (conversationId: string) => void;
}

export const ConversationList = ({
	currentUserId,
	activeConversationId,
	onSelectConversation,
}: ConversationListProps) => {
	const { data: conversations = [], isLoading } = useConversationsQuery();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="text-foreground/50">Cargando conversaciones...</div>
			</div>
		);
	}

	if (conversations.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full p-6 text-center">
				<p className="text-foreground/50 mb-2">No tienes conversaciones</p>
				<p className="text-sm text-foreground/40">
					Dale like a una habitación para empezar a chatear
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full overflow-y-auto">
			{conversations.map((conversation) => (
				<ConversationItem
					conversation={conversation}
					currentUserId={currentUserId}
					isActive={conversation.id === activeConversationId}
					key={conversation.id}
					onClick={() => onSelectConversation(conversation.id)}
				/>
			))}
		</div>
	);
};
