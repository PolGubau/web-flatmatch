import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";

type FooterMenuItem = {
	href: string;
	icon: IconSvgElement;
	label: TranslationKey;
	badge?: number;
	isLoadingBadge?: boolean;
};

type MobileNavigationProps = {
	items: FooterMenuItem[];
};

export const MobileNavigation = ({ items }: MobileNavigationProps) => {
	const { t } = useTranslation();

	return (
		<nav
			aria-label="Mobile navigation"
			className="w-full max-w-md mx-auto pb-safe"
		>
			<ul className="grid grid-cols-4 gap-0.5">
				{items.map((item) => (
					<li key={item.href}>
						<NavLink
							aria-label={t(item.label)}
							className={({ isActive }) =>
								cn(
									// Base styles
									"relative flex flex-col items-center justify-center gap-1.5",
									"py-2.5 px-2 min-h-[60px]",
									"transition-all duration-200 ease-out",
									"active:scale-95 active:brightness-90",
									// Text styles
									"text-xs font-medium",
									// State styles
									isActive
										? "text-primary"
										: "text-muted-foreground hover:text-foreground",
								)
							}
							to={item.href}
						>
							{({ isActive }) => (
								<>
									{/* Indicador superior para tab activa */}
									<div
										aria-hidden="true"
										className={cn(
											"absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300",
											isActive ? "w-12 bg-primary" : "w-0 bg-transparent",
										)}
									/>

									{/* Contenedor del ícono con efecto de fondo */}
									<div
										className={cn(
											"relative flex items-center justify-center transition-all duration-200",
											isActive && "scale-110",
										)}
									>
										<HugeiconsIcon
											icon={item.icon}
											size={22}
											strokeWidth={isActive ? 2 : 1.5}
										/>

										{/* Badge de notificación */}
										{item.badge !== undefined && (
											<span
												className={cn(
													"absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1",
													"flex items-center justify-center",
													"rounded-full border-2 border-background",
													"text-[10px] font-bold leading-none",
													item.isLoadingBadge
														? "bg-muted animate-pulse text-foreground/40"
														: "bg-destructive text-destructive-foreground animate-in zoom-in duration-200",
												)}
											>
												{item.isLoadingBadge
													? "..."
													: item.badge > 99
														? "99+"
														: item.badge || "0"}
											</span>
										)}
									</div>

									{/* Label */}
									<span
										className={cn(
											"transition-all duration-200",
											isActive && "font-semibold",
										)}
									>
										{t(item.label)}
									</span>
								</>
							)}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
