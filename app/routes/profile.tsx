import ProfilePage from "~/global/pages/Profile";
import type { Route } from "./+types/profile";

export function meta() {
	return [{ title: "User Profile | Flatmatch" }, { content: "User Profile", name: "description" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	return params.userId;
}

export default function ProfileRoute({ params }: Route.ComponentProps) {
	return <ProfilePage userId={params.userId} />;
}
