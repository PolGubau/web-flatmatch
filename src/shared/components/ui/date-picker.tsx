"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker() {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(undefined);

	return (
		<div className="flex flex-col gap-3">
			<Label className="px-1" htmlFor="date">
				Date of birth
			</Label>
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild>
					<Button className="w-48 justify-between font-normal" id="date" variant="outline">
						{date ? date.toLocaleDateString() : "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="w-auto overflow-hidden p-0">
					<Calendar
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
		</div>
	);
}
