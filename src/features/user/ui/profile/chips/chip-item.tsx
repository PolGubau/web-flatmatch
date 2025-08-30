import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "~/shared/utils/utils";

export type Item = {
	icon: IconSvgElement;
	label: string;
};

const theme = {
	base: "p-2 px-3 rounded-2xl bg-foreground/5 w-fit flex items-center gap-2 text-foreground/80",
	text: "first-letter:capitalize line-clamp-1 truncate text-sm ",
};
export function ProfileChip({ icon, label }: Item) {
	return (
		<li className={theme.base}>
			<HugeiconsIcon icon={icon} size={20} />
			<p className={theme.text}>{label}</p>
		</li>
	);
}

export function ProfileChipSkeleton() {
	return (
		<li className={theme.base}>
			<div className={cn("loading w-[20px] h-[20px]")} />
			<p className={cn(theme.text, "line-clamp-1 loading")}>Cargando</p>
		</li>
	);
}
