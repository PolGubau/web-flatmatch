import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type * as React from "react";

import { cn } from "~/shared/utils/utils";
import { inputTheme } from "./input/theme";

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
						"min-h-20 max-h-screen",
						inputTheme,
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
