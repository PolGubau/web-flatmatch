import { Calendar03Icon, UserAccountIcon, WorkIcon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { useUser } from "~/features/user/model/use-user";
import type { Item } from "~/features/user/ui/profile/chip-item";
import ProfileChipList from "~/features/user/ui/profile/chip-list";
import { CompleteProfile } from "~/features/user/ui/profile/complete-profile/complete-profile";
import ProfileHeader from "~/features/user/ui/profile/header";
import { dateToYearsAgo } from "~/shared/utils/formatters/dates/date-to-years-ago";

type Props = {
	userId: string;
	isYours: boolean;
};

export default function ProfilePage({ userId, isYours }: Props) {
	const { data: user, isLoading, dataUpdatedAt } = useUser(userId);
	// get user by id
	const { t, i18n } = useTranslation();
	if (!user) {
		return <div>This user is not available</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
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
		<div className="flex flex-col gap-4">
			<ProfileHeader
				aboutMe={user.aboutMe}
				avatarUrl={user.avatarUrl}
				lastname={user.lastname}
				name={user.name}
			/>

			<ProfileChipList items={chips} />

			{isYours && (
				<CompleteProfile
					aboutMe={user.aboutMe}
					birthDate={user.birthDate}
					occupation={user.occupation}
					userId={user.id}
				/>
			)}

			<footer>
				<small>Last updated: {new Date(dataUpdatedAt).toLocaleString(i18n.language)}</small>
			</footer>
		</div>
	);
}
