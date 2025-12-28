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
import { useChatNotifications } from "~/features/chat/model/hooks/use-chat-notifications";
import { useUnreadMessages } from "~/features/chat/model/hooks/use-unread-messages";
import { NotificationBanner } from "~/features/chat/ui/notification-banner";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { UserButton } from "./header/user-button";
import { MobileNavigation } from "./navigation/mobile";

type FooterMenuItem = {
	href: string;
	icon: IconSvgElement;
	label: TranslationKey;
	badge?: number;
};

export const getMenuItems = (unreadCount = 0): FooterMenuItem[] => [
	{ href: "/", icon: Home01Icon, label: "home" },
	{ href: "/favs", icon: FavouriteIcon, label: "favourites" },
	{
		badge: unreadCount || undefined,
		href: "/chat",
		icon: Message01Icon,
		label: "chat",
	},
	{ href: "/profile", icon: UserIcon, label: "profile" },
];

const MainLayout = ({ children }: PropsWithChildren) => {
	const { t } = useTranslation();
	const { unreadCount } = useUnreadMessages();
	useChatNotifications(); // Activa notificaciones automáticas
	const menuItems = getMenuItems(unreadCount);

	return (
		<div className="grid grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr] relative flex-col h-dvh gap-4 overflow-hidden bg-background text-foreground">
			<header
				className="p-2 md:p-4 pl-4 flex justify-between items-center backdrop-blur-md"
				style={{ zIndex: 11 }}
			>
				<h1 className="text-primary">Flatmatch</h1>

				<ul className="flex gap-2 items-center max-md:hidden">
					{menuItems.map((item) => (
						<NavLink
							className={({ isActive, isPending }) => `
						flex items-center justify-center gap-1 hover:bg-foreground/5 transition-colors cursor-pointer px-4 py-1 rounded-full relative
						${isActive ? "text-primary" : "text-neutral-500"} 
						${isPending ? "text-primary-900" : "text-neutral-500"} 
              `}
							key={item.href}
							to={item.href}
						>
							<div className="relative">
								<HugeiconsIcon icon={item.icon} size={18} />
								{item.badge && item.badge > 0 && (
									<span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 flex items-center justify-center bg-destructive text-destructive-foreground rounded-full text-[9px] font-bold">
										{item.badge > 99 ? "99+" : item.badge}
									</span>
								)}
							</div>
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

			{/* Mobile Navigation Footer */}
			<footer
				className="sticky bottom-0 w-full bg-background/95 backdrop-blur-lg border-t border-border md:hidden supports-[backdrop-filter]:bg-background/80"
				style={{ zIndex: 11 }}
			>
				<MobileNavigation items={menuItems} />
			</footer>

			{/* Banner de notificaciones */}
			<NotificationBanner />
		</div>
	);
};

export default MainLayout;
