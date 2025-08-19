import type * as React from "react";

import { cn } from "~/shared/utils/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			className={cn(
				"file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"placeholder:text-foreground/70 selection:bg-primary selection:text-canvas  border-foreground/30 flex h-12 rounded-xl w-full min-w-0 border-2 px-4 py-1 transition-[color,box-shadow] outline-none",
				"focus-visible:border-foreground",
				"aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
				className,
			)}
			data-slot="input"
			type={type}
			{...props}
		/>
	);
}

export { Input };
