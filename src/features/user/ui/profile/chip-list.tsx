import { HugeiconsIcon } from "@hugeicons/react";
import type { Item } from "./chip-item";

type Props = {
	items: Item[];
};
export default function ProfileChipList({ items }: Props) {
	return (
		<ul className="flex gap-4 items-center overflow-x-auto">
			{items.map((item, index) => (
				<li
					className="p-2 px-3 rounded-2xl bg-foreground/5 w-fit flex items-center gap-2"
					// biome-ignore lint/suspicious/noArrayIndexKey: There is no better unique identifier available
					key={item.label + index}
				>
					<HugeiconsIcon icon={item.icon} size={20} />
					<p className="first-letter:capitalize max-md:text-xs line-clamp-1 truncate">
						{item.label}
					</p>
				</li>
			))}
		</ul>
	);
}
