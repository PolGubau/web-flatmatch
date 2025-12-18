import { useMutation } from "@tanstack/react-query";
import { getOrCreateConversation } from "../../infra/chat-api";

interface GetOrCreateConversationParams {
	otherUserId: string;
	roomId?: string;
}

export const useGetOrCreateConversationMutation = () => {
	return useMutation({
		mutationFn: async ({
			otherUserId,
			roomId,
		}: GetOrCreateConversationParams) => {
			return await getOrCreateConversation(otherUserId, roomId);
		},
	});
};
