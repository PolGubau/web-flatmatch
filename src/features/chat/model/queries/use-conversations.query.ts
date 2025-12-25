import { useQuery } from "@tanstack/react-query";
import type { ConversationWithMetadata } from "~/entities/message/conversation";
import { QUERY_KEYS } from "~/global/constants";
import { getConversations } from "../../infra/chat-api";

export const useConversationsQuery = () => {
	return useQuery<ConversationWithMetadata[]>({
		queryFn: () => getConversations(),
		queryKey: QUERY_KEYS.chat.conversations,
		refetchInterval: 30000, // Refetch cada 30 segundos para mantener actualizado
	});
};
