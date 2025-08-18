import { FavouriteIcon, Home01Icon, Message01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, NavLink, Outlet } from "react-router";

const footerMenuItems = [
	{ href: "/", icon: Home01Icon, label: "Home" },
	{ href: "/favs", icon: FavouriteIcon, label: "Favourites" },
	{ href: "/chat", icon: Message01Icon, label: "Chat" },
	{ href: "/profile", icon: UserIcon, label: "Profile" },
];

const MainLayout = () => {
	return (
		<div className="grid grid-rows-[auto_1fr_auto] relative flex-col min-h-screen gap-4 overflow-hidden">
			<header className="p-4 flex justify-between items-center">
				<h1 className="text-primary">Flatmatch</h1>

				<Link
					className="bg-primary hover:brightness-75 transition-all rounded-full px-4 py-2 text-canvas text-sm font-semibold"
					to={"/publish"}
				>
					Publish place
				</Link>
			</header>

			<main className="overflow-y-auto overflow-x-hidden px-6 max-w-7xl mx-auto w-full">
				<Outlet />
			</main>
			<footer className="inset-0 left-0 w-dvw bg-neutral-500/20 h-fit items-center justify-center flex z-50">
				<ul className="grid grid-cols-4 min-w-sm w-full max-w-md">
					{footerMenuItems.map((item) => (
						<NavLink
							className={({ isActive, isPending }) => `
              flex flex-col items-center justify-center gap-1 hover:bg-foreground/5 transition-colors cursor-pointer px-2 py-4
              ${isActive ? "text-primary" : "text-neutral-500"} 
              ${isPending ? "text-primary-900" : "text-neutral-500"} 
              `}
							key={item.href}
							to={item.href}
						>
							<HugeiconsIcon icon={item.icon} size={24} />
							<span className="text-xs">{item.label}</span>
						</NavLink>
					))}
				</ul>
			</footer>
		</div>
	);
};

export default MainLayout;
