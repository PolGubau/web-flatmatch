import { useTranslation } from "react-i18next";
import { TimeAgo } from "~/shared/components/ui/timeAgo";
import { ProfileAvatar } from "./avatar";
export default function ProfileHeader({
	name,
	hereSince,
	lastname,
	avatarUrl,
	aboutMe,
}: ProfileHeaderProps) {
	const { t } = useTranslation();
	return (
		<header className="grid grid-cols-[auto_1fr] gap-6">
			<ProfileAvatar avatarUrl={avatarUrl} name={name} size="md" />
			<div className="flex flex-col gap-2">
				<div className="grid w-fit grid-cols-[1fr_auto] gap-2 items-center ">
					<h1 className="font-semibold line-clamp-1 truncate">
						{name} {lastname}
					</h1>
					{/* <VerifiedStar /> */}
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-foreground/80 max-md:text-sm">
						{aboutMe ?? "No description provided."}
					</p>
					<small className="flex gap-1 text-foreground/60 text-xs items-center line-clamp-1">
						{t("registered")}:<TimeAgo realTime={false} timestamp={hereSince} />
					</small>
				</div>
			</div>
		</header>
	);
}
