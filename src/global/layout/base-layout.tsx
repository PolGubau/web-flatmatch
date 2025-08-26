import { Outlet, useNavigation } from "react-router";
import { LoadingSection } from "~/shared/components/LoadingSection";
import { Toaster } from "~/shared/components/ui/sonner";
import "../app.css";

export const BaseLayout = () => {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<div className="bg-canvas text-foreground">
			<Toaster />
			{isNavigating && <LoadingSection />}
			<Outlet />
		</div>
	);
};
