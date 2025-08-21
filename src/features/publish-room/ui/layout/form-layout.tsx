import { Link, Outlet } from "react-router";

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
		<section className=" h-full flex min-h-dvh">
			<div className="max-w-4xl py-6 grid w-full grid-rows-[auto_1fr_auto] gap-2">
				<header className="w-full flex flex-col gap-1 px-4">
					<Link className="text-sm hover:underline w-fit" to={"/"}>
						&larr; Go back
					</Link>

					<h1 className="text-2xl font-bold">Publish a new place</h1>
				</header>
				<section className="overflow-y-auto px-4">
					<Outlet />
				</section>
			</div>
		</section>
	);
}
