import ProfilePage from "src/global/pages/Profile";
import { mockUsers } from "~/features/user/__mock__/users";

export function meta() {
	return [{ title: "Your Profile | Flatmatch" }, { content: "Your Profile", name: "description" }];
}

export default function Profile() {
	const user = mockUsers[0];
	return (
		<div className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto px-4 md:px-6 ">
			<ProfilePage userId={user.id} />
		</div>
	);
}
