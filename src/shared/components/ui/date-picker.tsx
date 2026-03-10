import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import * as React from "react";
import { useTranslation } from "react-i18next";
import type { TranslationKey } from "~/shared/i18n/i18n";
import type { Breakpoints } from "~/shared/types/common";
import { cn } from "~/shared/utils/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { inputTheme } from "./input/theme";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = Omit<
	React.ComponentProps<typeof Calendar>,
	"selected"
> & {
	placeholder?: TranslationKey;
	name?: string;
	required?: boolean;
	defaultIsoValue?: string | null;
	label?: TranslationKey;
	size?: Breakpoints;
};
export function DatePicker({
	className,
	name,
	placeholder = "select_option",
	label,
	required = false,
	size = "md",
	defaultIsoValue,
	...props
}: DatePickerProps) {
	const { i18n } = useTranslation();
	const [open, setOpen] = React.useState<boolean>(false);
	const [date, setDate] = React.useState<string | null>(
		defaultIsoValue ?? null,
	);

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<Label htmlFor={props.id} required={required}>
					{t(label)}
				</Label>
			)}
			<input
				hidden
				name={name}
				onChange={(e) => setDate(e.target.value)}
				value={date ?? undefined}
			/>
			<button
				className={cn(inputTheme, "outline-0 justify-between")}
				data-size={size}
				id="date"
				onClick={() => setOpen(true)}
				type="button"
			>
				<span className="text-foreground/70 text-base md:text-sm">
					{date
						? new Date(date).toLocaleDateString(i18n.language)
						: t(placeholder)}
				</span>
				<HugeiconsIcon className="size-3.5" icon={ArrowDown01Icon} />
			</button>
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverContent align="start" className="w-auto overflow-hidden p-0">
					<div>
						<div>
							<Calendar
								{...props}
								captionLayout="dropdown"
								mode="single"
								onSelect={(date) => {
									setDate(date?.toISOString() ?? null);
									setOpen(false);
								}}
								selected={date ? new Date(date) : undefined}
							/>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
