import { FilterHorizontalIcon } from "@hugeicons/core-free-icons";
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
				className="max-md:size-14 md:h-14 md:flex-1"

				onClick={() => setIsOpen(true)} variant={"secondary"}
			>
				<HugeiconsIcon icon={FilterHorizontalIcon} size={16} strokeWidth={3} />
				<span className="max-sm:hidden">{t("filters")}</span>
			</Button>
			<Drawer
				onClose={() => setIsOpen(false)}
				open={isOpen}
				title={t("filters")}
			>
				<FiltersForm onSubmit={handleApply} />
			</Drawer>
		</>
	);
};
