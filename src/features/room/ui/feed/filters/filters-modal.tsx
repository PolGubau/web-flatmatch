import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import React from "react";
import { Button } from "~/shared/components/ui/button";
import { Drawer } from "~/shared/components/ui/drawer";
import { FiltersForm } from "./filters-form";

export const FiltersModal = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setIsOpen(true)} variant={"outline"}>
				<HugeiconsIcon icon={FilterIcon} size={16} strokeWidth={3} />
				{t("filters")}
			</Button>
			<Drawer
				footer={
					<nav className="w-full flex justify-end">
						<Button onClick={() => setIsOpen(false)}>
							{t("apply")}
							<HugeiconsIcon icon={FilterIcon} size={16} strokeWidth={3} />
						</Button>
					</nav>
				}
				onClose={() => setIsOpen(false)}
				open={isOpen}
				title={t("filters")}
			>
				<FiltersForm />
			</Drawer>
		</>
	);
};
