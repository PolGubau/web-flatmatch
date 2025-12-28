import {
	CheckmarkCircle01FreeIcons,
	ShareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "~/shared/components/ui/sonner";
import { setValueForSecs } from "~/shared/hooks/set-value-for-secs";
import { cn } from "~/shared/utils/utils";
import { vibrateSuccess } from "~/shared/utils/vibration";

export default function CopyRoomLinkButton() {
	const { isTrue, setTrue } = setValueForSecs();
	const handleClick = () => {
		navigator.clipboard
			.writeText(window.location.href)
			.then(() => {
				setTrue();
				vibrateSuccess();
			})
			.catch(() => {
				toast.error("Failed to copy link");
			});
		toast.success("Link copied to clipboard");
	};
	return (
		<button
			className="outline-0 focus:bg-foreground/5 p-1 rounded-lg"
			onClick={handleClick}
			type="button"
		>
			<HugeiconsIcon
				className={cn({
					"text-success": isTrue,
				})}
				icon={isTrue ? CheckmarkCircle01FreeIcons : ShareIcon}
				size={25}
			/>
		</button>
	);
}
