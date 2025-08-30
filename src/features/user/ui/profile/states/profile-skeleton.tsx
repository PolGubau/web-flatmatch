import { ProfileChipListSkeleton } from "../chips/chip-list";
import { ProfileHeaderSkeleton } from "../header-skeleton";

export const ProfileSkeleton = () => {
	return (
		<div className="gap-4 grid grid-rows-[auto_1fr_auto] select-none">
			<header className="flex flex-col gap-2">
				<ProfileHeaderSkeleton />
				<ProfileChipListSkeleton />
			</header>
			<section></section>

			<footer>
				<small className="loading">lorem ipsum lorem ipsum</small>
			</footer>
		</div>
	);
};
