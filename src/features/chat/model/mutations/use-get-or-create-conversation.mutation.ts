import { useMutation } from "@tanstack/react-query";
import { errorHandler } from "~/shared/utils/error-handler";
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
		onError: (error) => {
			errorHandler.logError(error, "Error getting or creating conversation");
		},
	});
};
