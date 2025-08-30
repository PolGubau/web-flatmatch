import { Outlet, useNavigation } from "react-router";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";
import { Toaster } from "~/shared/components/ui/sonner";
import "../app.css";
import { useEnv } from "~/shared/hooks/use-is-local";
import { OneTapComponent } from "../ui/sign-in-google";

export default function BaseLayout() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);
	const { isLocal } = useEnv();
	return (
		<div className="bg-foreground/10 text-foreground w-screen h-dvh relative">
			{isLocal && (
				<div
					className="bg-foreground text-canvas rounded-full w-4 h-4 fixed bottom-2 left-2 grid place-items-center text-xs"
					style={{ zIndex: 9999999 }}
					title="You are running in local mode"
				>
					L
				</div>
			)}
			{isNavigating && <LoadingSection label="loading_page" />}
			<Outlet />
			<Toaster />
			<OneTapComponent />
		</div>
	);
}
