import {
	FavouriteIcon,
	Home01Icon,
	Message01Icon,
	UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { ArrowUpFromLine } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { NetworkStatusIndicator } from "~/shared/components/network-status-indicator";
import { UserButton } from "./header/user-button";
import { MobileNavigation } from "./navigation/mobile";

type FooterMenuItem = {
	href: string;
	icon: IconSvgElement;
	label: TranslationKey;
};

export const menuItems: FooterMenuItem[] = [
	{ href: "/", icon: Home01Icon, label: "home" },
	{ href: "/favs", icon: FavouriteIcon, label: "favourites" },
	{ href: "/chat", icon: Message01Icon, label: "chat" },
	{ href: "/profile", icon: UserIcon, label: "profile" },
];

const MainLayout = ({ children }: PropsWithChildren) => {
	const { t } = useTranslation();
	return (
		<div className="grid grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr] relative flex-col h-dvh gap-4 overflow-hidden bg-background text-foreground">
			<NetworkStatusIndicator />
			<header
				className="p-2 md:p-4 pl-4 flex justify-between items-center backdrop-blur-md"
				style={{ zIndex: 11 }}
			>
				<h1 className="text-primary">Flatmatch</h1>

				<ul className="flex gap-2 items-center max-md:hidden">
					{menuItems.map((item) => (
						<NavLink
							className={({ isActive, isPending }) => `
						flex items-center justify-center gap-1 hover:bg-foreground/5 transition-colors cursor-pointer px-4 py-1 rounded-full
						${isActive ? "text-primary" : "text-neutral-500"} 
						${isPending ? "text-primary-900" : "text-neutral-500"} 
              `}
							key={item.href}
							to={item.href}
						>
							<HugeiconsIcon icon={item.icon} size={18} />
							<span className="text-xs">{t(item.label)}</span>
						</NavLink>
					))}
				</ul>

				<div className="flex gap-2 items-center">
					<Link
						className="bg-primary flex gap-2 items-center hover:brightness-75 transition-all rounded-full px-4 py-2 text-background text-sm font-semibold line-clamp-1 truncate"
						to={"/publish"}
					>
						<ArrowUpFromLine size={18} />
						<span className="max-md:hidden">{t("publish_place")}</span>
					</Link>
					<UserButton />
				</div>
			</header>

			<main className="overflow-y-auto overflow-x-visible mx-auto w-full h-full">
				{children ?? <Outlet />}
			</main>
			<footer
				className="inset-0 left-0 w-dvw bg-neutral-500/10 h-fit items-center justify-center flex md:hidden backdrop-blur-md"
				style={{ zIndex: 11 }}
			>
				<MobileNavigation />
			</footer>
		</div>
	);
};

export default MainLayout;
