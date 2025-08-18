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
		<div className=" min-h-screen grid grid-rows-[auto_1fr_auto] gap-2 py-6 max-w-4xl mx-auto px-6 w-full">
			<header className="w-full pt-6flex flex-col gap-1">
				<Link className="text-sm hover:underline w-fit" to={"/"}>
					&larr; Go back
				</Link>

				<h1 className="text-2xl font-bold">Publish a new place</h1>
			</header>
			<section className="">
				<Outlet />
			</section>
			{/* <footer className="p-6 flex items-center justify-between">
				{steps.map((step, index) => (
					<span
						className={`
						${isDone(index) ? "text-gray-500" : ""}
						${isBeingDone(index) ? "font-bold" : ""}
						flex gap-1 items-center`}
						key={step.label}
					>
						<HugeiconsIcon icon={step.icon} />
						<span className="text-sm max-sm:hidden">{step.label}</span>
					</span>
				))}
			</footer> */}
		</div>
	);
}
