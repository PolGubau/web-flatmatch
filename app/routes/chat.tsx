import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useConversationsQuery } from "~/features/chat/model/queries/conversations.query";
import { ChatWindow } from "~/features/chat/ui/chat-window";
import { ConversationList } from "~/features/chat/ui/conversation-list";
import { PleaseSignInPage } from "~/shared/components/pages/PleaseSignInPage";
import { useSession } from "~/shared/context/session-context";

export function meta() {
	return [
		{ title: "Chat | Flatmatch" },
		{ content: "Chat with other users | Flatmatch", name: "description" },
	];
}

export default function Chat() {
	const { session } = useSession();
	const [searchParams] = useSearchParams();
	const conversationParam = searchParams.get("conversation");

	const [activeConversationId, setActiveConversationId] = useState<
		string | null
	>(conversationParam || null);
	const { data: conversations } = useConversationsQuery();

	// Actualizar conversación activa si viene de query param
	useEffect(() => {
		if (conversationParam) {
			setActiveConversationId(conversationParam);
		}
	}, [conversationParam]);

	const activeConversation = conversations?.find(
		(c) => c.id === activeConversationId,
	);

	if (!session) {
		return <PleaseSignInPage />;
	}

	return (
		<section className="h-[calc(100vh-4rem)] max-w-7xl mx-auto flex border-x border-neutral-200 dark:border-neutral-700">
			{/* Lista de conversaciones */}
			<div className="w-full md:w-96 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
				<div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
					<h1 className="text-xl font-semibold">Mensajes</h1>
				</div>
				<div className="flex-1 overflow-hidden">
					<ConversationList
						activeConversationId={activeConversationId}
						onSelectConversation={setActiveConversationId}
					/>
				</div>
			</div>

			{/* Ventana de chat */}
			<div className="hidden md:block flex-1">
				<ChatWindow
					conversationId={activeConversationId}
					otherParticipantName={activeConversation?.otherParticipant.name}
				/>
			</div>
		</section>
	);
}
