import { FilterHorizontalIcon, FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import React from "react";
import { Button } from "~/shared/components/ui/button";
import { Drawer } from "~/shared/components/ui/drawer";
import { FiltersForm } from "./filters-form";

export const FiltersModal = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	function handleApply() {
		setIsOpen(false);
	}

	return (
		<>
			<Button
				className="min-w-14 h-14 flex-1"
				onClick={() => setIsOpen(true)}
				variant={"secondary"}
			>
				<HugeiconsIcon icon={FilterHorizontalIcon} size={16} strokeWidth={3} />
				<span className="max-sm:hidden">{t("filters")}</span>
			</Button>
			<Drawer
				onClose={() => setIsOpen(false)}
				onSubmit={handleApply}
				open={isOpen}
				title={t("filters")}
			>
				<FiltersForm onSubmit={handleApply} />
			</Drawer>
		</>
	);
};
