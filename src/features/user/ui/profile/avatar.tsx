import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "~/shared/utils/utils";

type ProfileAvatarSize = "sm" | "md";
type ProfileAvatarProps = {
	name: string;
	avatarUrl?: string;
	size?: ProfileAvatarSize;
};

export const ProfileAvatar = ({ name, avatarUrl, size = "md" }: ProfileAvatarProps) => {
	const className = cn("bg-canvas text-foreground/80 place-items-center grid ", {
		"h-[34px] w-[34px] rounded-full": size === "sm",
		"h-[120px] w-[120px] rounded-2xl": size === "md",
	});
	if (!avatarUrl) {
		return (
			<div className={className}>
				<HugeiconsIcon icon={UserIcon} size={size === "md" ? 90 : 40} />
			</div>
		);
	}
	return <img alt={`Avatar de ${name}`} className={className} src={avatarUrl} />;
};
