import { cn } from "~/shared/utils/utils";

export const inputTheme = cn(
	"file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",

	// Disabled
	"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed ",

	// Focus
	"focus-visible:ring-2 focus-visible:border-foreground/50 focus-visible:ring-border-muted-foreground",

	// Border
	"border-2 border-muted",
	"hover:border-muted-foreground/50",

	// Base - text-base (16px) en móvil para prevenir zoom en iOS, text-sm en desktop
	"flex items-center justify-between gap-2 rounded-xl w-full min-w-0 transition-[color,box-shadow] outline-none whitespace-nowrap bg-transparent text-base md:text-sm shadow-xs text-foreground",

	// Placeholder - text-base (16px) en móvil para prevenir zoom en iOS
	"placeholder:text-foreground/70 placeholder:text-base md:placeholder:text-sm",
	// Invalid
	"aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
	// Padding
	"pr-2 pl-3 py-1",
	// Height
	"data-[placeholder]:text-base md:data-[placeholder]:text-sm data-[placeholder]:text-foreground/70",
	"data-[size=md]:h-11 data-[size=sm]:h-9 data-[size=xs]:h-7 data-[size=lg]:h-13 data-[size=xl]:h-15",

	// Icon
	"[&_svg:not([class*='text-'])]:text-foreground/80 [&_svg]:text-foreground [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);
