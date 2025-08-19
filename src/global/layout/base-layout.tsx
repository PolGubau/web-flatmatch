import { Outlet } from "react-router";
import "../app.css";
import { Toaster } from "~/shared/components/ui/sonner";

export const BaseLayout = () => {
	return (
		<div className="bg-canvas text-foreground">
			<Toaster />
			<Outlet />
		</div>
	);
};
