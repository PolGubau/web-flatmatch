import { Outlet } from "react-router";
import { useSession } from "~/shared/context/session-context";
import LoginPage from "../auth/login";

const AuthProtectedRoute = () => {
	const { session } = useSession();
	if (!session) {
		// or you can redirect to a different page and show a message
		return <LoginPage redirectedBecauseGuard={true} />;
	}
	return <Outlet />;
};

export default AuthProtectedRoute;
