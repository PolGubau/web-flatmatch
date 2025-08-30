import { Calendar03Icon, UserAccountIcon, WorkIcon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { useUser } from "~/features/user/model/use-user";
import type { Item } from "~/features/user/ui/profile/chip-item";
import ProfileChipList from "~/features/user/ui/profile/chip-list";
import { CompleteProfile } from "~/features/user/ui/profile/complete-profile/complete-profile";
import ProfileHeader from "~/features/user/ui/profile/header";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";
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
		return <div>This user is not available</div>;
	}
	if (isLoading) {
		return <LoadingSection className="min-h-[50vh]" />;
	}
	const chips: Item[] = [
		{
			icon: UserAccountIcon,
			label: t(user.gender),
		},
		{
			icon: Calendar03Icon,
			label: user.birthDate
				? t("years", { count: dateToYearsAgo(new Date(user.birthDate)) })
				: t("unknown"),
		},
		{
			icon: WorkIcon,
			label: user.occupation ? t(user.occupation) : t("unknown"),
		},
	];
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
				{isYours && (
					<CompleteProfile
						aboutMe={user.aboutMe}
						birthDate={user.birthDate}
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
