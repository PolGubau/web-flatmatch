import { Link } from "react-router";
import { useConversationsQuery } from "../model/queries/use-conversations.query";
import { ConversationItem } from "./conversation-item";
import { ConversationListSkeleton } from "./conversation-list-skeleton";

interface ConversationListProps {
	currentUserId: string;
	activeConversationId?: string;
	isLoading: boolean;
}

export const ConversationList = ({
	currentUserId,
	activeConversationId,
	isLoading,
}: ConversationListProps) => {
	const { data: conversations = [] } = useConversationsQuery();

	if (isLoading) {
		return <ConversationListSkeleton />;
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
				<Link
					className="block"
					key={conversation.id}
					to={`/chat/${conversation.id}`}
				>
					<ConversationItem
						conversation={conversation}
						currentUserId={currentUserId}
						isActive={conversation.id === activeConversationId}
					/>
				</Link>
			))}
		</div>
	);
};
