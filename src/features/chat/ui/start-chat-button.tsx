import { Message01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetOrCreateConversationMutation } from "../model/mutations/chat.mutations";

interface StartChatButtonProps {
	ownerId: string;
	roomId?: string;
	ownerName?: string;
}

export function StartChatButton({
	ownerId,
	roomId,
	ownerName = "el propietario",
}: StartChatButtonProps) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const createConversation = useGetOrCreateConversationMutation();

	const handleStartChat = async () => {
		setIsLoading(true);
		try {
			const conversationId = await createConversation.mutateAsync({
				otherUserId: ownerId,
				roomId,
			});
			navigate(`/chat?conversation=${conversationId}`);
		} catch (error) {
			console.error("Error al crear conversación:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			disabled={isLoading}
			onClick={handleStartChat}
			type="button"
		>
			<HugeiconsIcon icon={Message01Icon} size={20} />
			<span>
				{isLoading ? "Abriendo chat..." : `Mensajear con ${ownerName}`}
			</span>
		</button>
	);
}
