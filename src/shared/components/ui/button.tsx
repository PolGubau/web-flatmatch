import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "~/shared/utils/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-foreground/50 focus-visible:ring-2 aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error cursor-pointer",
	{
		defaultVariants: {
			size: "default",
			variant: "default",
		},
		variants: {
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				icon: "size-9",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
			},
			variant: {
				default: "bg-primary text-canvas shadow-xs hover:bg-primary/90",
				destructive:
					"bg-error text-white shadow-xs hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60",
				ghost: "hover:bg-foreground/10 hover:text-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				outline:
					"bg-transparent border-2 border-foreground/30 shadow-xs hover:bg-foreground/5 text-foreground/80 hover:text-foreground",
				secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			},
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={cn(buttonVariants({ className, size, variant }))}
			data-slot="button"
			{...props}
		/>
	);
}

export { Button, buttonVariants };
