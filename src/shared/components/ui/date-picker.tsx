"use client";

import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Props = React.ComponentProps<typeof Calendar> & {
	placeholder?: string;
	name?: string;
};
export function DatePicker({ className, name, placeholder, ...props }: Props) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [date, setDate] = React.useState<Date | null>(null);

	return (
		<>
			<input
				hidden
				name={name}
				onChange={(e) => setDate(new Date(e.target.value))}
				value={date?.toISOString()}
			/>
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild>
					<Button className=" justify-between font-normal" id="date" variant="outline">
						{date ? date.toLocaleDateString() : placeholder}
						<HugeiconsIcon icon={ArrowDown01Icon} />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="w-auto overflow-hidden p-0">
					<Calendar
						{...props}
						captionLayout="dropdown"
						mode="single"
						onSelect={(date) => {
							setDate(date);
							setOpen(false);
						}}
						selected={date}
					/>
				</PopoverContent>
			</Popover>
		</>
	);
}
