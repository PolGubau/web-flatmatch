import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { menuItems } from "../main-layout";

export const MobileNavigation = () => {
	const { t } = useTranslation();

	return (
		<ul className="grid grid-cols-4 min-w-sm w-full max-w-md">
			{menuItems.map((item) => (
				<NavLink
					className={({ isActive, isPending }) => `
        flex flex-col items-center justify-center gap-1 hover:bg-foreground/5 transition-colors cursor-pointer px-2 py-1 pt-2 md:py-4 
        ${isActive ? "text-primary " : "text-neutral-500"} 
        ${isPending ? "text-primary-900" : "text-neutral-500"} 
        `}
					key={item.href}
					to={item.href}
				>
					<HugeiconsIcon icon={item.icon} size={20} />
					<span className="text-[0.6em]">{t(item.label)}</span>
				</NavLink>
			))}
		</ul>
	);
};
