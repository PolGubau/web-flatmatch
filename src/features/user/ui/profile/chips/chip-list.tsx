import type { PropsWithChildren } from "react";
import { type Item, ProfileChip, ProfileChipSkeleton } from "./chip-item";

type Props = {
	items: Item[];
};
export function ProfileChipList({ items }: Props) {
	return (
		<ChipListLayout>
			{items.map(({ icon, label }, index) => (
				<ProfileChip
					icon={icon}
					// biome-ignore lint/suspicious/noArrayIndexKey: There is no better unique identifier available
					key={label + index}
					label={label}
				/>
			))}
		</ChipListLayout>
	);
}

export function ProfileChipListSkeleton() {
	return (
		<ChipListLayout>
			{[1, 2, 3].map((n) => (
				<ProfileChipSkeleton key={n} />
			))}
		</ChipListLayout>
	);
}

export const ChipListLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="relative max-w-[93vw] select-none">
			<ul className="flex gap-4 items-center overflow-x-auto">{children}</ul>
			<div className="w-8 h-full bg-gradient-to-r to-background absolute right-0 top-0 z-10"></div>
		</div>
	);
};
