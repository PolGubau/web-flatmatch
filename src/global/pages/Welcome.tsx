import { Navigate } from "react-router";
import { WelcomeFlow } from "~/features/welcome-flow/ui/flow";
import { WelcomeFlowLayout } from "~/features/welcome-flow/ui/layout";
import { useSession } from "~/shared/context/session-context";

export const WelcomePage = () => {
	const { session } = useSession();
	if (!session) return <Navigate replace to="/login" />;

	return (
		<WelcomeFlowLayout>
			<WelcomeFlow userId={session.user.id} />
		</WelcomeFlowLayout>
	);
};
