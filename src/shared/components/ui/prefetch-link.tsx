import { Link, type LinkProps } from "react-router";
import { cn } from "~/shared/utils/utils";

interface PrefetchLinkProps extends LinkProps {
	children: React.ReactNode;
	className?: string;
	prefetch?: "intent" | "render" | "none";
}

/**
 * Link component optimizado con prefetch automático
 * - "intent": Precarga cuando el usuario hace hover o focus
 * - "render": Precarga inmediatamente cuando se renderiza
 * - "none": No precarga (default de Link)
 */
export const PrefetchLink = ({
	children,
	className,
	prefetch = "intent",
	...props
}: PrefetchLinkProps) => {
	return (
		<Link
			{...props}
			className={cn(className)}
			// @ts-expect-error - prefetch is a valid prop in React Router v7
			prefetch={prefetch}
		>
			{children}
		</Link>
	);
};
