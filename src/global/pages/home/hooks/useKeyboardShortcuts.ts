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
export const useKeyboardShortcuts = ({
	isEnabled,
	currentRoom,
	onSwipe,
}: UseKeyboardShortcutsProps) => {
	useEffect(() => {
		if (!isEnabled || !currentRoom) return;

		const handleKeyPress = (event: KeyboardEvent) => {
			// Ignore if user is typing in an input field
			if (
				event.target instanceof HTMLInputElement ||
				event.target instanceof HTMLTextAreaElement
			) {
				return;
			}

			const key = event.key.toLowerCase();
			const actionMap: Record<string, SwipeDirection> = {
				a: "left",
				arrowleft: "left",
				arrowright: "right",
				arrowup: "up",
				d: "right",
				w: "up",
			};

			const direction = actionMap[key];
			if (direction) {
				event.preventDefault();
				onSwipe(currentRoom.id, direction);
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [isEnabled, currentRoom, onSwipe]);
};
