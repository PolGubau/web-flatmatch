import { TickIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Command as CommandPrimitive } from "cmdk";
import { t } from "i18next";
import { Delete } from "lucide-react";
import { type HTMLAttributes, useMemo, useState } from "react";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";
import { Button } from "./button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "./command";
import { inputTheme } from "./input/theme";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Skeleton } from "./skeleton";

type Props<T extends string> = HTMLAttributes<HTMLInputElement> & {
	selectedValue: T;
	onSelectedValueChange: (value: T) => void;
	searchValue: string;
	onSearchValueChange: (value: string) => void;
	items: { value: T; label: string }[];
	isLoading?: boolean;
	emptyMessage?: string;
	placeholder: TranslationKey;
	rightContent?: React.ReactNode;
};

export function AutoComplete<T extends string>({
	selectedValue,
	onSelectedValueChange,
	searchValue,
	onSearchValueChange,
	items,
	isLoading,
	emptyMessage = "No items.",
	placeholder = "search",
	rightContent,
	...rest
}: Props<T>) {
	const [open, setOpen] = useState(false);

	const labels = useMemo(
		() =>
			items.reduce(
				(acc, item) => {
					acc[item.value] = item.label;
					return acc;
				},
				{} as Record<string, string>,
			),
		[items],
	);

	const reset = () => {
		onSelectedValueChange("" as T);
		onSearchValueChange("");
	};

	const onSelectItem = (inputValue: string) => {
		if (inputValue === selectedValue) {
			reset();
		} else {
			onSelectedValueChange(inputValue as T);
			onSearchValueChange(labels[inputValue] ?? "");
		}
		setOpen(false);
	};

	return (
		<div className="flex">
			<Popover onOpenChange={setOpen} open={open}>
				<Command shouldFilter={false}>
					<PopoverAnchor asChild>
						<div className={cn(inputTheme, "h-12")}>
							<CommandPrimitive.Input
								{...rest}
								className="flex-1 bg-transparent outline-none border-0 focus:ring-0"
								onFocus={() => setOpen(true)}
								onKeyDown={(e) => setOpen(e.key !== "Escape")}
								onMouseDown={() => setOpen((open) => !!searchValue || !open)}
								onValueChange={onSearchValueChange}
								placeholder={t(placeholder)}
								value={searchValue}
							/>
							<div className="flex gap-1 items-center">
								{rightContent}
								<Button
									disabled={!selectedValue}
									onClick={reset}
									size={"icon"}
									type="button"
									variant={"ghost"}
								>
									<Delete />
								</Button>
							</div>
						</div>
					</PopoverAnchor>
					{!open && <CommandList aria-hidden="true" className="hidden" />}
					<PopoverContent
						asChild
						onInteractOutside={(e) => {
							if (
								e.target instanceof Element &&
								e.target.hasAttribute("cmdk-input")
							) {
								e.preventDefault();
							}
						}}
						onOpenAutoFocus={(e) => e.preventDefault()}
					>
						<CommandList
							className="w-[90vw] p-0 max-w-2xl rounded-lg border border-foreground/30 bg-background"
							style={{ zIndex: 9999 }}
						>
							{isLoading && (
								<CommandPrimitive.Loading>
									<div className="p-1 flex flex-col gap-1">
										<Skeleton className="w-full min-h-8">Loading...</Skeleton>
										<Skeleton className="w-full min-h-8">Loading...</Skeleton>
										<Skeleton className="w-full min-h-8">Loading...</Skeleton>
										<Skeleton className="w-full min-h-8">Loading...</Skeleton>
										<Skeleton className="w-full min-h-8">Loading...</Skeleton>
									</div>
								</CommandPrimitive.Loading>
							)}
							{items.length > 0 && !isLoading ? (
								<CommandGroup>
									{items.map((option) => (
										<CommandItem
											key={option.value}
											onMouseDown={(e) => e.preventDefault()}
											onSelect={onSelectItem}
											value={option.value}
										>
											<HugeiconsIcon
												className={cn(
													"mr-2 h-4 w-4",
													selectedValue === option.value
														? "opacity-100"
														: "opacity-0",
												)}
												icon={TickIcon}
												size={16}
											/>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							) : null}
							{!isLoading ? (
								<CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
							) : null}
						</CommandList>
					</PopoverContent>
				</Command>
			</Popover>
		</div>
	);
}
