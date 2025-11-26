import { Building05Icon, MapPinpoint01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { Outlet, useLocation } from "react-router";
import { GoHomeButton } from "~/shared/components/go-home-button";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";

type Step = {
	icon: typeof Building05Icon;
	label: TranslationKey;
	path: string;
};
const steps: Step[] = [
	{
		icon: Building05Icon,
		label: "type",
		path: "/publish",
	},
	{
		icon: MapPinpoint01Icon,
		label: "location",
		path: "/publish/location",
	},
	{
		icon: Building05Icon,
		label: "commodities",
		path: "/publish/commodities",
	},
	{
		icon: Building05Icon,
		label: "people",
		path: "/publish/people",
	},
];

export default function FormLayout() {
	const { pathname } = useLocation();
	const currentStepIndex = steps.findIndex((step) => step.path === pathname);
	const isDone = (index: number) => index < currentStepIndex;
	const isBeingDone = (index: number) => index === currentStepIndex;

	return (
		<div className=" min-h-dvh grid grid-rows-[auto_1fr_auto] gap-2 py-3 md:py-6 max-w-7xl mx-auto px-4 md:px-6 w-full">
			<header className="w-full pt-6 flex gap-2 items-center">
				<GoHomeButton hasLabel={false} />

				<h1 className="text-2xl font-bold">{t("publish_place")}</h1>

				<nav className="flex items-center gap-4 justify-end flex-1">
					<ul className="flex">
						{steps.map((step, index) => {
							const StepIcon = step.icon;
							const isCurrent = isBeingDone(index);
							const isThisDone = isDone(index);
							return (
								<li
									className={cn(
										`flex gap-1 items-center first:rounded-l-full first:pl-3 px-1 py-1 last:rounded-r-full last:pr-3`,
										{
											"bg-foreground/10 rounded-r-full": isCurrent,
											"bg-primary/10": isThisDone,
										},
									)}
									key={step.label}
									title={t(step.label)}
								>
									<HugeiconsIcon
										className={
											isThisDone
												? "text-primary"
												: isCurrent
													? "text-foreground"
													: "text-foreground/60"
										}
										icon={StepIcon}
										size={20}
									/>
									{isCurrent && (
										<span className={"text-sm pr-1.5"}>{t(step.label)}</span>
									)}
								</li>
							);
						})}
					</ul>
				</nav>
			</header>
			<section className="overflow-y-auto">
				<Outlet />
			</section>
		</div>
	);
}
