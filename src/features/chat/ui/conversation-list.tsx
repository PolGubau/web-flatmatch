import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
	const { data: conversations = [] } = useConversationsQuery();

	if (isLoading) {
		return <ConversationListSkeleton />;
	}

	if (conversations.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full p-6 text-center">
				<p className="text-foreground/50 mb-2">{t("no_conversations_yet")}</p>
				<p className="text-sm text-foreground/40">
					{t("no_conversations_description")}
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
