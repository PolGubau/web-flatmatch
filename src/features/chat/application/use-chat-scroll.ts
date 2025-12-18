import { useCallback, useRef } from "react";

export function useChatScroll() {
	const containerRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = useCallback(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		container.scrollTo({
			behavior: "smooth",
			top: container.scrollHeight,
		});
	}, []);

	return { containerRef, scrollToBottom };
}
