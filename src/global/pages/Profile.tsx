import { Calendar03Icon, UserAccountIcon, WorkIcon } from "@hugeicons/core-free-icons";
import { mockUsers } from "~/features/user/__mock__/users";
import type { Item } from "~/features/user/ui/profile/chip-item";
import ProfileChipList from "~/features/user/ui/profile/chip-list";
import ProfileHeader from "~/features/user/ui/profile/header";
import { dateToYearsAgo } from "~/shared/utils/formatters/dates/date-to-years-ago";

type Props = {
	userId: string;
};

export default function ProfilePage({ userId }: Props) {
	const user = mockUsers.find((user) => user.id === userId);
	if (!user) return null;

	const chips: Item[] = [
		{
			icon: UserAccountIcon,
			label: user.gender,
		},
		{
			icon: Calendar03Icon,
			label: `${dateToYearsAgo(user.birthDate)} years`,
		},
		{
			icon: WorkIcon,
			label: user.occupation,
		},
	];
	return (
		<main className="max-4-xl mx-auto flex flex-col gap-4">
			<ProfileHeader
				aboutMe={user.aboutMe}
				avatarUrl={user.avatarUrl}
				lastname={user.lastname}
				name={user.name}
			/>

			<ProfileChipList items={chips} />
		</main>
	);
}
