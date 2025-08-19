import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { type HTMLAttributes, useMemo, useState } from "react";
import { cn } from "~/shared/utils/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./command";
import { Input } from "./input";
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
	placeholder?: string;
};

export function AutoComplete<T extends string>({
	selectedValue,
	onSelectedValueChange,
	searchValue,
	onSearchValueChange,
	items,
	isLoading,
	emptyMessage = "No items.",
	placeholder = "Search...",
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

	const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!e.relatedTarget?.hasAttribute("cmdk-list") && labels[selectedValue] !== searchValue) {
			reset();
		}
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
						<CommandPrimitive.Input
							asChild
							onBlur={onInputBlur}
							onFocus={() => setOpen(true)}
							onKeyDown={(e) => setOpen(e.key !== "Escape")}
							onMouseDown={() => setOpen((open) => !!searchValue || !open)}
							onValueChange={onSearchValueChange}
							value={searchValue}
						>
							<Input placeholder={placeholder} {...rest} />
						</CommandPrimitive.Input>
					</PopoverAnchor>
					{!open && <CommandList aria-hidden="true" className="hidden" />}
					<PopoverContent
						asChild
						onInteractOutside={(e) => {
							if (e.target instanceof Element && e.target.hasAttribute("cmdk-input")) {
								e.preventDefault();
							}
						}}
						onOpenAutoFocus={(e) => e.preventDefault()}
					>
						<CommandList className="w-full min-w-[200px] p-0 max-w-4xl flex flex-col ">
							{isLoading && (
								<CommandPrimitive.Loading>
									<div className="p-1">
										<Skeleton className="h-6 w-full" />
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
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													selectedValue === option.value ? "opacity-100" : "opacity-0",
												)}
											/>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							) : null}
							{!isLoading ? <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty> : null}
						</CommandList>
					</PopoverContent>
				</Command>
			</Popover>
		</div>
	);
}
