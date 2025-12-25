import { useSession } from "~/shared/context/session-context";
import { useUpdateRoomInteraction } from "../../model/mutations/update-room-interaction";

type UseRoomFavoriteToggleProps = {
	roomId: string;
	isFavorite: boolean;
};

export const useRoomFavoriteToggle = ({
	roomId,
	isFavorite,
}: UseRoomFavoriteToggleProps) => {
	const { check } = useSession();
	const { likeRoom, removeLikeRoom } = useUpdateRoomInteraction();

	const toggleFavorite = (e?: React.MouseEvent) => {
		// Prevent navigation if called from within a Link
		e?.preventDefault();
		e?.stopPropagation();

		check();

		if (isFavorite) {
			removeLikeRoom.mutate(roomId);
		} else {
			likeRoom.mutate({ action: "like", roomId });
		}
	};

	const isLoading = likeRoom.isPending || removeLikeRoom.isPending;

	return {
		isLoading,
		toggleFavorite,
	};
};
