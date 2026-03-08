import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
	threshold?: number;
	root?: Element | null;
	rootMargin?: string;
	enabled?: boolean;
}

/**
 * Hook para detectar cuando un elemento entra en el viewport
 * Útil para infinite scroll, lazy loading, etc.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
	options: UseIntersectionObserverOptions = {},
) {
	const {
		threshold = 0,
		root = null,
		rootMargin = "0px",
		enabled = true,
	} = options;

	const [isIntersecting, setIsIntersecting] = useState(false);
	const targetRef = useRef<T>(null);

	useEffect(() => {
		if (!enabled) return;

		const target = targetRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
			},
			{
				root,
				rootMargin,
				threshold,
			},
		);

		observer.observe(target);

		return () => {
			observer.disconnect();
		};
	}, [enabled, root, rootMargin, threshold]);

	return { isIntersecting, ref: targetRef };
}
