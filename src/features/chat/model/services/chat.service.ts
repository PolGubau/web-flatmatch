import type { ConversationWithMetadata } from "~/entities/message/conversation";
import type { Message } from "~/entities/message/message";
import {
	getConversations as getConversationsApi,
	getMessages as getMessagesApi,
	getOrCreateConversation as getOrCreateConversationApi,
	markMessagesAsRead as markMessagesAsReadApi,
	sendMessage as sendMessageApi,
} from "../../infra/chat-api";

export const conversationService = {
	async getAll(): Promise<ConversationWithMetadata[]> {
		return await getConversationsApi();
	},

	async getOrCreate(otherUserId: string, roomId?: string): Promise<string> {
		return await getOrCreateConversationApi(otherUserId, roomId);
	},
};

export const messageService = {
	async getByConversation(conversationId: string): Promise<Message[]> {
		return await getMessagesApi(conversationId);
	},

	async markAsRead(conversationId: string): Promise<void> {
		return await markMessagesAsReadApi(conversationId);
	},

	async send(conversationId: string, content: string): Promise<Message> {
		return await sendMessageApi(conversationId, content);
	},
};
