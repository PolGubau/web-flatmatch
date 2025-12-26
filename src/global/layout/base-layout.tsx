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
			{isNavigating && <LoadingSection label="loading_page" />}
			<Outlet />
			<Toaster />
			<OneTapComponent />
			<InstallPrompt />
		</div>
	);
}
