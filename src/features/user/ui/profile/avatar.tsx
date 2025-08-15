import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ProfileAvatarProps = {
	name: string;
	avatarUrl?: string;
};

const commonClassNames =
	"h-[120px] w-[120px] rounded-2xl bg-foreground/10 grid place-items-center text-foreground/80";
export const ProfileAvatar = ({ name, avatarUrl }: ProfileAvatarProps) => {
	if (!avatarUrl) {
		return (
			<div className={commonClassNames}>
				<HugeiconsIcon icon={UserIcon} size={90} />
			</div>
		);
	}
	return <img alt={`Avatar de ${name}`} className={commonClassNames} src={avatarUrl} />;
};
