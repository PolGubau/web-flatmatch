import { cn } from "~/shared/utils/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"bg-foreground/10 text-transparent animate-pulse rounded-md",
				className,
			)}
			data-slot="skeleton"
			{...props}
		/>
	);
}

export { Skeleton };
