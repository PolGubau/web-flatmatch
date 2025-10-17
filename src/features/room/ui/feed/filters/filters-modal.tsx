import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Button } from "~/shared/components/ui/button";
import { Drawer } from "~/shared/components/ui/drawer";

export const FiltersModal = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setIsOpen(true)} variant={"outline"}>
				<HugeiconsIcon icon={FilterIcon} size={16} strokeWidth={3} />
				Filters
			</Button>
			<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
				{/* Filters content goes here */}
				test
			</Drawer>
		</>
	);
};
