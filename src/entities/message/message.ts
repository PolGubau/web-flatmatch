export interface Message {
	id: string;
	roomId?: string;
	conversationId: string;
	senderId: string;
	receiverId: string;
	content: string;
	sentAt: Date;
	isRead: boolean;
}
