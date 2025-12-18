import { ChatPage } from "~/features/chat";

export function meta() {
	return [
		{ title: "Chat | Flatmatch" },
		{ content: "Chat with other users | Flatmatch", name: "description" },
	];
}

export default function Chat() {

	return (
		<ChatPage />
	)
}
