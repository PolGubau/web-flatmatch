import { type InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { useSession } from "~/shared/context/session-context";
import type { SwipeDirection } from "../../types/common";
import { useUpdateRoomInteraction } from "../mutations/update-room-interaction";

interface Params {
	onOpenDetails: (roomId: Room["id"]) => void;
}

export const useSwipeActions = ({ onOpenDetails }: Params) => {
	const queryClient = useQueryClient();
	const { check } = useSession();
	const { likeRoom } = useUpdateRoomInteraction();

	const removeRoomFromCache = useCallback(
		(roomId: Room["id"]) => {
			queryClient.setQueryData<InfiniteData<RoomWithMetadata[], Error>>(
				["rooms"],
				(oldData) => {
					console.log("Old data before removing room:", oldData);

					if (!oldData) {
						console.warn("No rooms in cache yet!");
						return oldData;
					}
					// ⚠️ creamos nuevas referencias para pages y arrays internos
					const newPages = oldData.pages.map((page) =>
						page.filter((r) => r.id !== roomId),
					);
					console.log("Removing room from cache:", roomId, { newPages });
					return {
						...oldData,
						pageParams: oldData.pageParams,
						pages: newPages,
					};
				},
			);
		},
		[queryClient],
	);

	const handleSwipe = useCallback(
		(roomId: Room["id"], direction: SwipeDirection) => {
			switch (direction) {
				case "left":
					check();
					// likeRoom.mutate({ roomId, action: "dislike" });
					removeRoomFromCache(roomId);
					break;
				case "right":
					check();
					likeRoom.mutate({ action: "like", roomId });
					removeRoomFromCache(roomId);
					break;
				case "up":
					onOpenDetails(roomId);
					break;
				case "down":
					console.debug("Swiped down");
					break;
			}
		},
		[check, likeRoom, removeRoomFromCache, onOpenDetails],
	);

	return { handleSwipe };
};
