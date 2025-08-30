import FavsPage from "src/global/pages/Favs";
import { PleaseSignInPage } from "~/shared/components/pages/PleaseSignInPage";
import { useSession } from "~/shared/context/session-context";

export function meta() {
	return [{ title: "Flatmatch" }, { content: "Welcome to Flatmatch!", name: "description" }];
}

export default function Favs() {
	const { session } = useSession();

	if (!session) {
		return <PleaseSignInPage />;
	}
	return <FavsPage />;
}
