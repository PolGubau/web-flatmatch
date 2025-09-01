import { UserCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";
import { useSession } from "~/shared/context/session-context";
import { ProfileAvatar } from "./avatar";

type Props = {
	size?: "sm" | "md";
};
export const YourAvatar = ({ size = "sm" }: Props) => {
	const { session } = useSession();
	const { avatar_url, name } = session?.user.user_metadata ?? {};

	if (!session) return <SignInAvatar />;

	return <ProfileAvatar avatarUrl={avatar_url ?? undefined} name={name as string} size={size} />;
};

export const SignInAvatar = () => {
	return (
		<Link title="Login" to={"/auth/login"}>
			<div className="bg-primary/10 text-foreground/80 place-items-center grid h-[34px] w-[34px] rounded-full">
				<HugeiconsIcon icon={UserCircle02Icon} size={25} />
			</div>
		</Link>
	);
};
