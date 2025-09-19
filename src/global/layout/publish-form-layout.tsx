import { Link, Outlet } from "react-router";
import { GoHomeButton } from "~/shared/components/go-home-button";

// const steps = [
// 	{
// 		icon: Building05Icon,
// 		label: "Type",
// 		path: "/publish",
// 	},
// 	{
// 		icon: Building05Icon,
// 		label: "Location",
// 		path: "/publish/location",
// 	},
// 	{
// 		icon: Building05Icon,
// 		label: "Commodities",
// 		path: "/publish/commodities",
// 	},
// 	{
// 		icon: Building05Icon,
// 		label: "Photos",
// 		path: "/publish/photos",
// 	},
// ];

export default function FormLayout() {
	// const { pathname } = useLocation();
	// const currentStep = steps.findIndex((step) => step.path === pathname);
	// const isDone = (index: number) => index < currentStep;
	// const isBeingDone = (index: number) => index === currentStep;

	return (
		<div className=" min-h-dvh grid grid-rows-[auto_1fr_auto] gap-2 py-3 md:py-6 max-w-7xl mx-auto px-4 md:px-6 w-full">
			<header className="w-full pt-6 flex flex-col gap-1">
				<GoHomeButton />

				<h1 className="text-2xl font-bold">Publish a new place</h1>
			</header>
			<section className="overflow-y-auto">
				<Outlet />
			</section>
		</div>
	);
}
