import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type * as React from "react";

import { cn } from "~/shared/utils/utils";

type InputProps = React.ComponentProps<"input"> & {
	icon?: IconSvgElement;
};

function Input({ className, type, icon, ...props }: InputProps) {
	return (
		<div className="relative">
			{icon && (
				<HugeiconsIcon
					className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60"
					icon={icon}
					size={22}
				/>
			)}

			<input
				className={cn(
					"file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
					"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"placeholder:text-foreground/70 border-foreground/30 flex h-12 rounded-xl w-full min-w-0 border-2 px-4 py-1 transition-[color,box-shadow] outline-none",
					"focus-visible:border-foreground",
					"aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
					{
						"pl-10": icon,
					},
					className,
				)}
				data-slot="input"
				type={type}
				{...props}
			/>
		</div>
	);
}

export { Input };
