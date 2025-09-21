import {
	Calendar03Icon,
	UserAccountIcon,
	WorkIcon,
} from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router";
import { useUser } from "~/features/user/model/use-user";
import type { Item } from "~/features/user/ui/profile/chips/chip-item";
import { ProfileChipList } from "~/features/user/ui/profile/chips/chip-list";
import { CompleteProfile } from "~/features/user/ui/profile/complete-profile/complete-profile";
import ProfileHeader from "~/features/user/ui/profile/header";
import { ProfileSkeleton } from "~/features/user/ui/profile/states/profile-skeleton";
import { TimeAgo } from "~/shared/components/ui/timeAgo";
import { dateToYearsAgo } from "~/shared/utils/formatters/dates/date-to-years-ago";

type Props = {
	userId: string;
	isYours: boolean;
};

export default function ProfilePage({ userId, isYours }: Props) {
	const { data: user, isLoading, dataUpdatedAt } = useUser(userId);
	// get user by id
	const { t } = useTranslation();
	if (!user) {
		return <ProfileSkeleton />;
	}
	if (!user.name || !user.lastname) {
		return <Navigate replace to="/welcome" />;
	}
	if (isLoading) {
		return <ProfileSkeleton />;
	}
	const chips: Item[] = [
		{
			icon: UserAccountIcon,
			label: t(user.gender ?? "unknown"),
		},
		{
			icon: Calendar03Icon,
			label: user.birthDate
				? t("x_years", { count: dateToYearsAgo(new Date(user.birthDate)) })
				: t("unknown"),
		},
		{
			icon: WorkIcon,
			label: user.occupation ? t(user.occupation) : t("unknown"),
		},
	];

	const someInfoMissing =
		!user.aboutMe || !user.birthDate || !user.occupation || !user.gender;

	return (
		<div className="gap-4 grid grid-rows-[auto_1fr_auto]">
			<header className="flex flex-col gap-2">
				<ProfileHeader
					aboutMe={user.aboutMe}
					avatarUrl={user.avatarUrl}
					hereSince={user.createdAt}
					lastname={user.lastname}
					name={user.name}
				/>
				<ProfileChipList items={chips} />
			</header>
			<section>
				{isYours && someInfoMissing && (
					<CompleteProfile
						aboutMe={user.aboutMe}
						birthDate={user.birthDate}
						gender={user.gender}
						occupation={user.occupation}
						userId={user.id}
					/>
				)}
			</section>

			<footer>
				<small>
					{t("last_update")}: <TimeAgo timestamp={new Date(dataUpdatedAt)} />
				</small>
			</footer>
		</div>
	);
}
