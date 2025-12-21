import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "~/shared/utils/utils";

export type ProfileAvatarSize = "sm" | "md" | "lg";
type ProfileAvatarProps = {
	name: string;
	avatarUrl?: string | null;
	size?: ProfileAvatarSize;
	className?: string;
};

const theme = {
	base: "bg-primary/10 text-foreground/80 place-items-center grid",
	lg: "h-[80px] w-[80px] rounded-xl",
	md: "h-[120px] w-[120px] rounded-2xl",
	sm: "h-[32px] w-[32px] rounded-full",
};

export const ProfileAvatar = ({
	name = "",
	avatarUrl,
	size = "md",
	className: customClassName,
}: ProfileAvatarProps) => {
	const className = cn(
		theme.base,
		{
			[theme.sm]: size === "sm",
			[theme.md]: size === "md",
			[theme.lg]: size === "lg",
		},
		customClassName,
	);
	if (!avatarUrl) {
		return (
			<div className={className}>
				{name?.length > 0 ? <span>{name.split("")[0]}</span>
					:
					<HugeiconsIcon
						icon={UserIcon}
						size={size === "md" ? 90 : size === "lg" ? 60 : 20}
						stroke="currentColor"
					/>}
			</div>
		);
	}
	return <img alt={name.split("")[0]} className={className} src={avatarUrl} />;
};
