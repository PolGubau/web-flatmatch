import { VerifiedStar } from "~/shared/ui/verified/star";
import { ProfileAvatar } from "./avatar";

type ProfileHeaderProps = {
	name: string;
	lastname: string;
	avatarUrl?: string;
	aboutMe?: string;
};
export default function ProfileHeader({ name, lastname, avatarUrl, aboutMe }: ProfileHeaderProps) {
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

				<p className="text-foreground/80">{aboutMe}</p>
			</div>
		</header>
	);
}
