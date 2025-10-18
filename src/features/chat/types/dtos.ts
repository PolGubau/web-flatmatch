import type { Message } from "~/entities/message/message";

export type MessageDB = {
	id: string;
	conversation_id: string;
	sender_id: string;
	content: string;
	sent_at: string;
	is_read: boolean;
	created_at: string;
};

export type ConversationDB = {
	id: string;
	room_id: string | null;
	participant_1_id: string;
	participant_2_id: string;
	last_message_at: string;
	created_at: string;
	updated_at: string;
};

export const messageMapper = {
	toDb(
		message: Omit<Message, "id" | "receiverId" | "roomId">,
	): Omit<MessageDB, "id" | "created_at"> {
		return {
			content: message.content,
			conversation_id: message.conversationId,
			is_read: message.isRead,
			sender_id: message.senderId,
			sent_at: message.sentAt.toISOString(),
		};
	},
	toDomain(dto: MessageDB): Message {
		return {
			content: dto.content,
			conversationId: dto.conversation_id,
			id: dto.id,
			isRead: dto.is_read,
			receiverId: "", // Se calcula en el contexto
			roomId: undefined,
			senderId: dto.sender_id,
			sentAt: new Date(dto.sent_at),
		};
	},
};
