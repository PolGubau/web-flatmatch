import { Navigate, Outlet } from "react-router";
import { useSession } from "~/shared/context/session-context";

const AuthProtectedRoute = () => {
	const { session } = useSession();

	if (!session) {
		console.log("Session checked and not found");
		// or you can redirect to a different page and show a message
		return <Navigate replace to="/auth/login?redirectedByGuard=true" />;
	}
	return <Outlet />;
};

export default AuthProtectedRoute;
