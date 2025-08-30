import ProfilePage from "src/global/pages/Profile";
import { PleaseSignInPage } from "~/shared/components/pages/PleaseSignInPage";
import { useSession } from "~/shared/context/session-context";

export function meta() {
	return [{ title: "Your Profile | Flatmatch" }, { content: "Your Profile", name: "description" }];
}

export default function Profile() {
	const { session } = useSession();
	if (!session) {
		return <PleaseSignInPage />;
	}

	const userId = session?.user.id;

	return (
		<div className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto px-4 md:px-6 h-full grid">
			<ProfilePage isYours userId={userId} />
		</div>
	);
}
