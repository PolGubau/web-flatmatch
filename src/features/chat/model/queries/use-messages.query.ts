import { useQuery } from "@tanstack/react-query";
import type { Message } from "~/entities/message/message";
import { getMessages } from "../../infra/chat-api";

export const useMessagesQuery = (conversationId: string | null) => {
	return useQuery<Message[]>({
		enabled: !!conversationId,
		queryFn: () => {
			if (!conversationId) throw new Error("No conversation ID");
			return getMessages(conversationId);
		},
		queryKey: ["messages", conversationId],
	});
};
