import { Outlet } from "react-router";
import { SessionProvider } from "~/shared/context/session-context";

export default function Providers() {
	return (
		<SessionProvider>
			<Outlet />
		</SessionProvider>
	);
}
