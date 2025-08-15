import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function VerifiedStar() {
	return (
		<div
			className="gap-1 flex w-fit items-center rounded-full text-canvas/90 bg-primary/70 backdrop-blur-md p-1 text-xs"
			title="Verified"
		>
			<HugeiconsIcon className="fill-canvas/80" icon={StarIcon} size={13} />
		</div>
	);
}
