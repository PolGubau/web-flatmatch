import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export type Item = {
	icon: IconSvgElement;
	label: string;
};
type Props = {
	item: Item;
};
export function ProfileChipItem({ item }: Props) {
	return (
		<li className="p-2 px-3 rounded-2xl bg-foreground/5 w-fit flex items-center gap-2">
			<HugeiconsIcon icon={item.icon} />
			<p className="first-letter:capitalize">{item.label}</p>
		</li>
	);
}
