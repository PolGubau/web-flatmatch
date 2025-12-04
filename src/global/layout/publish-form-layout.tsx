import { t } from "i18next";
import {
	BadgeQuestionMark,
	Book,
	BookA,
	BookCheck,
	Building,
	Camera,
	Check,
	Clock,
	MailQuestion,
	Option,
	Pin,
	UserSearch,
	WashingMachine,
} from "lucide-react";
import { Outlet, useLocation } from "react-router";
import { GoHomeButton } from "~/shared/components/go-home-button";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";

type Step = {
	icon: typeof Building;
	label: TranslationKey;
	path: string;
};
const steps: Step[] = [
	{
		icon: Building,
		label: "type",
		path: "/publish",
	},
	{
		icon: Pin,
		label: "location",
		path: "/publish/location",
	},
	{
		icon: WashingMachine,
		label: "commodities",
		path: "/publish/commodities",
	},
	{
		icon: UserSearch,
		label: "people",
		path: "/publish/company",
	},
	{
		icon: Camera,
		label: "metadata",
		path: "/publish/metadata",
	},
	{
		icon: BadgeQuestionMark,
		label: "preferences",
		path: "/publish/preferences",
	},
	{
		icon: BookCheck,
		label: "rules",
		path: "/publish/rules",
	},
	{
		icon: Clock,
		label: "timings",
		path: "/publish/timings",
	},
	{
		icon: Check,
		label: "preview",
		path: "/publish/preview",
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
					<ul className="flex items-center">
						{steps.map((step, index) => {
							const StepIcon = step.icon;
							const isCurrent = isBeingDone(index);
							const isThisDone = isDone(index);
							return (
								<li
									className={cn(
										`flex gap-1 items-center border-b  border-transparent text-foreground/50 h-7 px-1`,
										{
											"text-foreground  border-foreground/20": isThisDone,
											"text-primary px-2 border-foreground/20": isCurrent,
										},
									)}
									key={step.label}
									title={t(step.label)}
								>
									<StepIcon size={14} />
									{isCurrent && (
										<span className={"text-sm"}>{t(step.label)}</span>
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
