import { useEffect } from "react";
import type { Room } from "~/entities/room/room";
import type { SwipeDirection } from "~/features/room/types/common";

type UseKeyboardShortcutsProps = {
	isEnabled: boolean;
	currentRoom: Room | undefined;
	onSwipe: (roomId: string, direction: SwipeDirection) => void;
};

/**
 * Custom hook for handling keyboard shortcuts in the room swipe interface
 * Supports arrow keys (←, →, ↑) and WASD keys (A, D, W)
 */
import { useCallback } from "react";
import { useKeyMap } from "~/shared/hooks/use-key-map";

export const useKeyboardShortcuts = ({
	isEnabled,
	currentRoom,
	onSwipe,
}: UseKeyboardShortcutsProps) => {
	// Create a stable handler for swiping the current room
	const swipeCurrentRoom = useCallback(
		(direction: SwipeDirection) => {
			if (!currentRoom) return;
			onSwipe(currentRoom.id, direction);
		},
		[currentRoom, onSwipe],
	);

	// Map keyboard keys to swipe actions (lowercase keys expected)
	const actionMap: Record<string, () => void> = {
		a: () => swipeCurrentRoom("left"),
		arrowleft: () => swipeCurrentRoom("left"),
		arrowright: () => swipeCurrentRoom("right"),
		arrowup: () => swipeCurrentRoom("up"),
		d: () => swipeCurrentRoom("right"),
		w: () => swipeCurrentRoom("up"),
	};

	// Delegate key handling to the reusable hook
	useKeyMap(actionMap, isEnabled && !!currentRoom);
};
