import type { Message } from "~/entities/message/message";

/**
 * Tipo que representa un mensaje en la base de datos (snake_case)
 */
export interface MessageDB {
	id: string;
	conversation_id: string;
	sender_id: string;
	receiver_id: string;
	content: string;
	sent_at: string;
	is_read: boolean;
	room_id?: string;
}

/**
 * Mapper para convertir entre MessageDB y Message
 */
export const messageMapper = {
	toDatabase: (message: Message): Partial<MessageDB> => ({
		content: message.content,
		conversation_id: message.conversationId,
		is_read: message.isRead,
		receiver_id: message.receiverId,
		room_id: message.roomId,
		sender_id: message.senderId,
		sent_at: message.sentAt.toISOString(),
	}),
	toDomain: (db: MessageDB): Message => ({
		content: db.content,
		conversationId: db.conversation_id,
		id: db.id,
		isRead: db.is_read,
		receiverId: db.receiver_id,
		roomId: db.room_id,
		senderId: db.sender_id,
		sentAt: new Date(db.sent_at),
	}),
};
