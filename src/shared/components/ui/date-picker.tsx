"use client";

import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import * as React from "react";
import { useTranslation } from "react-i18next";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { Button } from "./button";
import { Calendar } from "./calendar";
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
};
export function DatePicker({
	className,
	name,
	placeholder = "select_option",
	label,
	required = false,
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
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild>
					<Button
						className=" justify-between font-normal h-12"
						id="date"
						variant="outline"
					>
						{date
							? new Date(date).toLocaleDateString(i18n.language)
							: t(placeholder)}
						<HugeiconsIcon icon={ArrowDown01Icon} />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="w-auto overflow-hidden p-0">
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
				</PopoverContent>
			</Popover>
		</div>
	);
}
