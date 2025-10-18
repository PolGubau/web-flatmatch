export interface Conversation {
	id: string;
	roomId?: string;
	participantIds: string[];
	lastMessageAt: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface ConversationWithMetadata extends Conversation {
	otherParticipant: {
		id: string;
		name: string;
		avatar: string | null;
	};
	lastMessage: {
		content: string;
		sentAt: Date;
		senderId: string;
	} | null;
	unreadCount: number;
}
