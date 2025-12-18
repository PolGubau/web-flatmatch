import { useParams } from "react-router";
import { ChatPage } from "~/features/chat";

export function meta() {
	return [
		{ title: "Chat | Flatmatch" },
		{ content: "Chat with other users | Flatmatch", name: "description" },
	];
}

export default function Chat() {
	const { conversationId } = useParams<{ conversationId?: string }>();

	return <ChatPage initialConversationId={conversationId} />;
}
