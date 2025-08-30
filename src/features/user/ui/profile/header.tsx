import { useTranslation } from "react-i18next";
import { VerifiedStar } from "~/shared/components/ui/verified/star";
import { ProfileAvatar } from "./avatar";

type ProfileHeaderProps = {
	name: string;
	lastname: string;
	avatarUrl?: string;
	hereSince: Date;
	aboutMe?: string;
};
export default function ProfileHeader({
	name,
	hereSince,
	lastname,
	avatarUrl,
	aboutMe,
}: ProfileHeaderProps) {
	const {t,
		i18n: { language },
	} = useTranslation();
	return (
		<header className="grid grid-cols-[auto_1fr] gap-6">
			<ProfileAvatar avatarUrl={avatarUrl} name={name} />
			<div className="flex flex-col gap-2">
				<div className="grid w-fit grid-cols-[1fr_auto] gap-2 items-center ">
					<h1 className="font-semibold line-clamp-1 truncate">
						{name} {lastname}
					</h1>
					<VerifiedStar />
				</div>
				<div>
					<p className="text-foreground/80 max-md:text-sm">
						{aboutMe ?? "No description provided."}
					</p>
					<small>
						{t("here_since")}:{hereSince.toLocaleDateString(language)}
					</small>
				</div>
			</div>
		</header>
	);
}
