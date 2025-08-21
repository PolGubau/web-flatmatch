import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { JSX } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type RadioBoxProps<InternalName extends string> = {
	label: string;
	value: string;
	icon?: IconSvgElement;
	customIcon?: JSX.Element;
	description?: string;
	field: UseFormRegisterReturn<InternalName>;
};

export const RadioBox = <T extends string>({
	label,
	value,
	icon,
	description,
	field,
	customIcon = undefined,
}: RadioBoxProps<T>) => {
	return (
		<li className="flex group cursor-pointer" key={value}>
			<label className="has-checked:bg-primary/20 bg-secondary/10 hover:brightness-75 transition-all p-4 md:p-6 w-full h-full grid items-center grid-cols-[1fr_auto] rounded-xl gap-3 md:gap-6">
				<div className="flex items-end gap-2">
					{icon ? <HugeiconsIcon icon={icon} size={36} /> : customIcon}
					<span className="text-xl">{label}</span>
				</div>
				<input
					className="outline-0 checked:accent-primary "
					type="radio"
					{...field}
					value={value}
				/>
				{description && <p className="text-foreground/80 text-sm text-pretty">{description}</p>}
			</label>
		</li>
	);
};
