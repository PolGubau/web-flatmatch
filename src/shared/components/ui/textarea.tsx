import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type * as React from "react";

import { cn } from "~/shared/utils/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
	icon?: IconSvgElement;
	label?: string;
};

function Textarea({ className, icon, label, ...props }: TextareaProps) {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="flex gap-2" htmlFor={props.id}>
					<span className="text-sm">{label}</span>
				</label>
			)}

			<div className="relative">
				{icon && (
					<HugeiconsIcon
						className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60"
						icon={icon}
						size={22}
					/>
				)}

				<textarea
					className={cn(
						"file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
						"min-h-20",
						"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						"placeholder:text-foreground/70 placeholder:text-sm border-foreground/30 flex h-12 rounded-xl w-full min-w-0 border-2 pr-2 pl-4 py-1 transition-[color,box-shadow] outline-none",
						"focus-visible:border-foreground",
						"aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
						{
							"pl-10": icon,
						},
						className,
					)}
					data-slot="textarea"
					{...props}
				/>
			</div>
		</div>
	);
}

export { Textarea };
