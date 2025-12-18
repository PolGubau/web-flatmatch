import type { ConversationWithMetadata } from "~/entities/message/conversation";
import type { Message } from "~/entities/message/message";
import { supabase } from "~/global/supabase/client";
import type { MessageDB } from "../types/dtos";
import { messageMapper } from "../types/dtos";

async function getUserId(): Promise<string> {
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		throw new Error("No authenticated user found");
	}
	return user.id;
}

interface MessageRow {
	content: string;
	sent_at: string;
	sender_id: string;
	is_read: boolean;
}

interface ConversationRow {
	id: string;
	participant_1_id: string;
	participant_2_id: string;
	room_id: string | null;
	last_message_at: string;
	created_at: string;
	updated_at: string;
	participant_1: {
		id: string;
		name: string;
		avatar_url: string | null;
	};
	participant_2: {
		id: string;
		name: string;
		avatar_url: string | null;
	};
	messages: MessageRow[];
}

/**
 * Obtiene todas las conversaciones del usuario con metadata
 */
export async function getConversations(): Promise<ConversationWithMetadata[]> {
	const userId = await getUserId();

	const { data, error } = await supabase
		.from("conversations")
		.select(`
			*,
			participant_1:users!conversations_participant_1_id_fkey(id, name, avatar_url),
			participant_2:users!conversations_participant_2_id_fkey(id, name, avatar_url),
			messages(content, sent_at, sender_id, is_read)
		`)
		.or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
		.order("last_message_at", { ascending: false });

	if (error) throw error;
	if (!data) return [];

	return data.map((conv: ConversationRow) => {
		const isParticipant1 = conv.participant_1_id === userId;
		const otherParticipant = isParticipant1
			? conv.participant_2
			: conv.participant_1;

		// Obtener último mensaje
		const sortedMessages = (conv.messages || []).sort(
			(a: MessageRow, b: MessageRow) =>
				new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime(),
		);
		const lastMessage = sortedMessages[0];

		// Contar mensajes no leídos del otro participante
		const unreadCount = (conv.messages || []).filter(
			(msg: MessageRow) => msg.sender_id !== userId && !msg.is_read,
		).length;

		return {
			createdAt: new Date(conv.created_at),
			id: conv.id,
			lastMessage: lastMessage
				? {
						content: lastMessage.content,
						senderId: lastMessage.sender_id,
						sentAt: new Date(lastMessage.sent_at),
					}
				: null,
			lastMessageAt: new Date(conv.last_message_at),
			otherParticipant: {
				avatar: otherParticipant.avatar_url,
				id: otherParticipant.id,
				name: otherParticipant.name,
			},
			participantIds: [conv.participant_1_id, conv.participant_2_id],
			roomId: conv.room_id,
			unreadCount,
			updatedAt: new Date(conv.updated_at),
		};
	});
}

/**
 * Obtiene o crea una conversación entre dos usuarios
 */
export async function getOrCreateConversation(
	otherUserId: string,
	roomId?: string,
): Promise<string> {
	const userId = await getUserId();

	// Buscar conversación existente
	const { data: existing } = await supabase
		.from("conversations")
		.select("id")
		.or(
			`and(participant_1_id.eq.${userId},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${userId})`,
		)
		.maybeSingle();

	if (existing) return existing.id;

	// Crear nueva conversación
	const { data: newConv, error } = await supabase
		.from("conversations")
		.insert({
			last_message_at: new Date().toISOString(),
			participant_1_id: userId,
			participant_2_id: otherUserId,
			room_id: roomId || null,
		})
		.select("id")
		.single();

	if (error) throw error;
	return newConv.id;
}

/**
 * Obtiene los mensajes de una conversación
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
	const { data, error } = await supabase
		.from("messages")
		.select("*")
		.eq("conversation_id", conversationId)
		.order("sent_at", { ascending: true });

	if (error) throw error;
	if (!data) return [];

	return data.map((msg: MessageDB) => messageMapper.toDomain(msg));
}

/**
 * Envía un mensaje
 */
export async function sendMessage(
	conversationId: string,
	content: string,
): Promise<Message> {
	const userId = await getUserId();

	const { data, error } = await supabase
		.from("messages")
		.insert({
			content,
			conversation_id: conversationId,
			is_read: false,
			sender_id: userId,
			sent_at: new Date().toISOString(),
		})
		.select()
		.single();

	if (error) throw error;

	// Actualizar last_message_at de la conversación
	await supabase
		.from("conversations")
		.update({ last_message_at: new Date().toISOString() })
		.eq("id", conversationId);

	return messageMapper.toDomain(data);
}

/**
 * Marca mensajes como leídos
 */
export async function markMessagesAsRead(
	conversationId: string,
): Promise<void> {
	const userId = await getUserId();

	const { error } = await supabase
		.from("messages")
		.update({ is_read: true })
		.eq("conversation_id", conversationId)
		.neq("sender_id", userId)
		.eq("is_read", false);

	if (error) throw error;
}

/**
 * Suscribirse a nuevos mensajes en tiempo real
 */
export function subscribeToMessages(
	conversationId: string,
	onNewMessage: (message: Message) => void,
) {
	return supabase
		.channel(`messages:${conversationId}`)
		.on(
			"postgres_changes",
			{
				event: "INSERT",
				filter: `conversation_id=eq.${conversationId}`,
				schema: "public",
				table: "messages",
			},
			(payload) => {
				const message = messageMapper.toDomain(payload.new as MessageDB);
				onNewMessage(message);
			},
		)
		.subscribe();
}
