import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetOrCreateConversationMutation } from "~/features/chat";
import { useSession } from "~/shared/context/session-context";
import { useUpdateRoomInteraction } from "../../../model/mutations/update-room-interaction";
import { vibrateLike, vibrateSuccess } from "~/shared/utils/vibration";

type UseRoomDetailsActionsProps = {
	roomId: string;
	ownerId: string;
	isFavourite: boolean;
};

export const useRoomDetailsActions = ({
	roomId,
	ownerId,
	isFavourite,
}: UseRoomDetailsActionsProps) => {
	const navigate = useNavigate();
	const { check } = useSession();
	const createConversation = useGetOrCreateConversationMutation();
	const { likeRoom, removeLikeRoom } = useUpdateRoomInteraction();
	const [isSharing, setIsSharing] = useState(false);

	const handleStartChat = async () => {
		const conversationId = await createConversation.mutateAsync({
			otherUserId: ownerId,
			roomId,
		});
		navigate(`/chat?conversationId=${conversationId}`);
	};

	const handleFavouriteClick = () => {
		check();
		if (isFavourite) {
			removeLikeRoom.mutate(roomId);
		} else {
			// Add haptic feedback when favoriting a room
			vibrateLike();
			likeRoom.mutate({ action: "like", roomId });
		}
	};

	const handleShare = async (shareData: ShareData) => {
		if (isSharing) return;

		// Check if Web Share API is supported
		if (navigator.share && navigator.canShare?.(shareData)) {
			try {
				setIsSharing(true);
				await navigator.share(shareData);
			} catch (error) {
				// User cancelled or error occurred
				if (error instanceof Error && error.name !== "AbortError") {
					console.error("Error sharing:", error);
					// Fallback to copy to clipboard
					await fallbackShare(shareData.url);
				}
			} finally {
				setIsSharing(false);
			}
		} else {
			// Fallback for browsers that don't support Web Share API
			await fallbackShare(shareData.url);
		}
	};

	const fallbackShare = async (url?: string) => {
		try {
			await navigator.clipboard.writeText(url ?? window.location.href);
			// Add haptic feedback for successful copy
			vibrateSuccess();
			// You could add a toast notification here
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
		}
	};

	return {
		handleFavouriteClick,
		handleShare,
		handleStartChat,
		isSharing,
	};
};
