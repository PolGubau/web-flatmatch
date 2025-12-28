import {
	Calendar03Icon,
	UserAccountIcon,
	WorkIcon,
} from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router";
import { YourRooms } from "~/features/room/ui/your-rooms/your-rooms";
import { useUser } from "~/features/user/model/use-user";
import type { Item } from "~/features/user/ui/profile/chips/chip-item";
import { ProfileChipList } from "~/features/user/ui/profile/chips/chip-list";
import { CompleteProfile } from "~/features/user/ui/profile/complete-profile/complete-profile";
import ProfileHeader from "~/features/user/ui/profile/header";
import { ProfileSkeleton } from "~/features/user/ui/profile/states/profile-skeleton";
import { ProfileErrorFallback } from "~/features/user/ui/profile-error-fallback";
import { ErrorBoundary } from "~/shared/components/error-boundary/error-boundary";
import { ErrorSection } from "~/shared/components/ui/error-section";
import { dateToYearsAgo } from "~/shared/utils/formatters/dates/date-to-years-ago";

type Props = {
	userId: string;
	isYours: boolean;
};

export default function ProfilePage({ userId, isYours }: Props) {
	const { data: user, isLoading, error, refetch } = useUser(userId);
	const { t } = useTranslation();

	if (isLoading) {
		return <ProfileSkeleton />;
	}

	if (error || !user) {
		return (
			<ErrorSection
				description={"error_loading_profile_description"}
				title={"error_loading_profile"}
			/>
		);
	}

	if (isYours && (!user.name || !user.lastname)) {
		return <Navigate replace to="/welcome" />;
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
		<ErrorBoundary
			fallback={<ProfileErrorFallback onReset={refetch} />}
			onReset={refetch}
		>
			<div className="gap-10 grid grid-rows-[auto_1fr]">
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
				<section className="flex flex-col gap-8">
					{isYours && someInfoMissing && (
						<CompleteProfile
							aboutMe={user.aboutMe}
							birthDate={user.birthDate}
							gender={user.gender}
							occupation={user.occupation}
							userId={user.id}
						/>
					)}
					<YourRooms />
				</section>
			</div>
		</ErrorBoundary>
	);
}
