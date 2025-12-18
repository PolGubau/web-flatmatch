import { useQuery } from "@tanstack/react-query";
import type { ConversationWithMetadata } from "~/entities/message/conversation";
import { getConversations } from "../../infra/chat-api";

export const useConversationsQuery = () => {
	return useQuery<ConversationWithMetadata[]>({
		queryFn: () => getConversations(),
		queryKey: ["conversations"],
		refetchInterval: 30000, // Refetch cada 30 segundos para mantener actualizado
	});
};
