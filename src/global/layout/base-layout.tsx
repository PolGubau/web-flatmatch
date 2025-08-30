import { Outlet, useNavigation } from "react-router";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";
import { Toaster } from "~/shared/components/ui/sonner";
import "../app.css";
import { OneTapComponent } from "../ui/sign-in-google";

export default function BaseLayout() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<div className="bg-foreground/10 text-foreground w-screen h-dvh">
			{isNavigating && <LoadingSection label="loading_page" />}
			<Outlet />
			<Toaster />
			<OneTapComponent />
		</div>
	);
}
