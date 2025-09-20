"use client";

import { ArrowDown01Icon, ArrowUp01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { t } from "i18next";
import type * as React from "react";
import type { TranslationKey } from "~/shared/i18n/i18n";
import type { Breakpoints } from "~/shared/types/common";
import { cn } from "~/shared/utils/utils";
import { inputTheme } from "./input/theme";

export type SelectProps = Omit<React.ComponentProps<typeof SelectPrimitive.Root>, "children"> & {
	id?: string;
	label?: string;
	placeholder?: TranslationKey;
	options: { value: string; label: TranslationKey }[];
};

function Select({ label, placeholder = "select_option", options, ...props }: SelectProps) {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="flex gap-2" htmlFor={props.id}>
					<span className="text-sm">{label}</span>
				</label>
			)}
			<SelectPrimitive.Root data-slot="select" {...props}>
				<SelectTrigger className="">
					<SelectValue placeholder={t(placeholder)} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{t(option.label)}
						</SelectItem>
					))}
				</SelectContent>
			</SelectPrimitive.Root>
		</div>
	);
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = "md",
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: Breakpoints;
}) {
	return (
		<SelectPrimitive.Trigger
			className={cn(inputTheme, className)}
			data-size={size}
			data-slot="select-trigger"
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<HugeiconsIcon className="size-4 opacity-50" icon={ArrowDown01Icon} />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = "popper",
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				className={cn(
					// Animation
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right] :slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",

					// Base
					"bg-canvas text-foreground relative z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-xl border-2 border-foreground/30 shadow-md",
					position === "popper" &&
						"data-[side=bottom]:translate-y-[2px] data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					"origin-(--radix-select-content-transform-origin) max-h-(--radix-select-content-available-height)",
					className,
				)}
				data-slot="select-content"
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			className={cn("text-foreground px-2 py-1.5 text-xs", className)}
			data-slot="select-label"
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			className={cn(
				"focus:bg-primary/10 focus:text-primary [&_svg:not([class*='text-'])]:text-primary relative flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			data-slot="select-item"
			{...props}
		>
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<HugeiconsIcon className="size-4" icon={Tick02Icon} />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			className={cn("bg-foreground/70 pointer-events-none -mx-1 my-1 h-px", className)}
			data-slot="select-separator"
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			className={cn("flex cursor-default items-center justify-center py-1", className)}
			data-slot="select-scroll-up-button"
			{...props}
		>
			<HugeiconsIcon className="size-4" icon={ArrowUp01Icon} />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			className={cn("flex cursor-default items-center justify-center py-1", className)}
			data-slot="select-scroll-down-button"
			{...props}
		>
			<HugeiconsIcon className="size-4" icon={ArrowDown01Icon} />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
