import { useEffect } from "react";

/**
 * useKeyMap
 * A small reusable hook that maps key presses to actions.
 * - actionMap: record of key (lowercase) -> handler fn
 * - enabled: whether the listener is active
 *
 * The handler ignores events originated from input or textarea elements.
 */
export const useKeyMap = (
  actionMap: Record<string, () => void>,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      const action = actionMap[key];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [actionMap, enabled]);
};
