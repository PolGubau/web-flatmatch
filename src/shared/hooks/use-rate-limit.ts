import { useCallback, useRef } from "react";
import { toast } from "~/shared/components/ui/sonner";

/**
 * Hook to rate limit function calls
 * @param limit - Maximum number of calls allowed
 * @param windowMs - Time window in milliseconds
 * @returns Function that returns true if call is allowed, false if rate limited
 *
 * @example
 * const checkRateLimit = useRateLimit(5, 60000); // 5 calls per minute
 *
 * const handleAction = () => {
 *   if (!checkRateLimit()) return;
 *   // Proceed with action
 * };
 */
export const useRateLimit = (limit: number, windowMs: number) => {
	const requestTimestamps = useRef<number[]>([]);

	return useCallback(
		(showToast = true) => {
			const now = Date.now();

			// Filter out timestamps outside the current window
			requestTimestamps.current = requestTimestamps.current.filter(
				(ts) => now - ts < windowMs,
			);

			// Check if limit exceeded
			if (requestTimestamps.current.length >= limit) {
				if (showToast) {
					toast.error("Too many requests. Please wait a moment.");
				}
				return false;
			}

			// Add current timestamp
			requestTimestamps.current.push(now);
			return true;
		},
		[limit, windowMs],
	);
};
