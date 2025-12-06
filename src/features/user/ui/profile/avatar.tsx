import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "~/shared/utils/utils";

type ProfileAvatarSize = "sm" | "md";
type ProfileAvatarProps = {
	name: string;
	avatarUrl?: string | null;
	size?: ProfileAvatarSize;
	className?: string;
};

const theme = {
	base: "bg-primary/10 text-foreground/80 place-items-center grid",
	md: "h-[120px] w-[120px] rounded-2xl",
	sm: "h-[32px] w-[32px] rounded-full",
};

export const ProfileAvatar = ({
	name,
	avatarUrl,
	size = "md",
	className: customClassName,
}: ProfileAvatarProps) => {
	const className = cn(
		theme.base,
		{
			[theme.sm]: size === "sm",
			[theme.md]: size === "md",
		},
		customClassName,
	);
	if (!avatarUrl) {
		return (
			<div className={className}>
				<HugeiconsIcon
					icon={UserIcon}
					size={size === "md" ? 90 : 20}
					stroke="currentColor"
				/>
			</div>
		);
	}
	return <img alt={name.split("")[0]} className={className} src={avatarUrl} />;
};
