import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const LikedHearth = () => {
	return <HugeiconsIcon className="fill-red-400" icon={FavouriteIcon} size={22} />;
};

export const AbsoluteLikedHeart = () => {
	return (
		<div className="absolute top-1 right-1 ring-neutral-200 group-hover:ring-neutral-300 text-foreground/50">
			<LikedHearth />
		</div>
	);
};
