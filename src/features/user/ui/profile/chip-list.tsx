import { HugeiconsIcon } from "@hugeicons/react";
import type { Item } from "./chip-item";

type Props = {
	items: Item[];
};
export default function ProfileChipList({ items }: Props) {
	return (
		<ul className="flex gap-4 items-center overflow-x-auto">
			{items.map((item) => (
				<li
					className="p-2 px-3 rounded-2xl bg-foreground/5 w-fit flex items-center gap-2"
					key={item.label}
				>
					<HugeiconsIcon icon={item.icon} />
					<p className="first-letter:capitalize">{item.label}</p>
				</li>
			))}
		</ul>
	);
}
