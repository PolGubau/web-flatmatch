import { FilterHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import React, { useCallback, useMemo } from "react";
import { Button } from "~/shared/components/ui/button";
import { Drawer } from "~/shared/components/ui/drawer";
import { Kbd } from "~/shared/components/ui/kbd";
import { Tooltip } from "~/shared/components/ui/tooltip";
import { useKeyMap } from "~/shared/hooks/use-key-map";
import { FiltersForm } from "./filters-form";

export const FiltersModal = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	// Keyboard shortcut: press 'F' to open the filters drawer
	const open = useCallback(() => setIsOpen(true), []);
	const actionMap = useMemo(() => ({ f: open }), [open]);
	useKeyMap(actionMap, true);

	function handleApply() {
		setIsOpen(false);
	}

	return (
		<>
			{" "}
			<Tooltip
				aria-label={t("filters")}
				label={
					<div className="flex items-center gap-2">
						{t("filters")} <Kbd>F</Kbd>
					</div>
				}
			>
				<Button
					className="min-w-14 h-14 flex-1"
					onClick={() => setIsOpen(true)}
					variant={"secondary"}
				>
					<HugeiconsIcon
						icon={FilterHorizontalIcon}
						size={16}
						strokeWidth={3}
					/>
					<span className="max-sm:hidden">{t("filters")}</span>
				</Button>
			</Tooltip>
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
