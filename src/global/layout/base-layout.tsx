import { Outlet, useNavigation } from "react-router";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";

import { DevPopover } from "~/shared/components/ui/debug/dev-popover";
import { InstallPrompt } from "~/shared/components/ui/install-prompt";
import { Toaster } from "~/shared/components/ui/sonner";
import { useEnv } from "~/shared/hooks/use-is-local";
import { OneTapComponent } from "../ui/sign-in-google";

export default function BaseLayout() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);
	const { isLocal } = useEnv();
	return (
		<div className="bg-background text-foreground w-screen h-dvh relative">
			{isLocal && <DevPopover />}
			{isNavigating && (
				<>
					{/* Barra de progreso superior */}
					<LoadingSection delay={300} type="bar" />
					{/* Overlay semi-transparente después de 1 segundo */}
					<LoadingSection
						className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
						delay={1000}
						label="loading_page"
					/>
				</>
			)}
			<Outlet />
			<Toaster />
			<OneTapComponent />
			<InstallPrompt />
		</div>
	);
}
