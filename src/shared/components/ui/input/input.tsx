import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type * as React from "react";
import type { Breakpoints } from "~/shared/types/common";
import { cn } from "~/shared/utils/utils";
import { inputTheme } from "./theme";

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
	icon?: IconSvgElement;
	label?: string;
	size?: Breakpoints;
};

function Input({ className, type, icon, label, size = "md", ...props }: InputProps) {
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

				<input
					className={cn(
						inputTheme,
						{
							"pl-10": !!icon,
						},
						className,
					)}
					data-size={size}
					data-slot="input"
					type={type}
					{...props}
				/>
			</div>
		</div>
	);
}

export { Input };
