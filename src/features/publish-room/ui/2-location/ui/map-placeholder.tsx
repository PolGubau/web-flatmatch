import { MapsIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";

export const MapPlaceholder = () => {
	return (
		<div className="w-full bg-foreground/5 grid place-items-center h-full min-h-64 rounded-lg overflow-hidden">
			<div className="flex flex-col items-center gap-2 text-foreground/60">
				<HugeiconsIcon icon={MapsIcon} size={60} />
				<p className="max-w-xs px-6 text-center text-pretty">
					{t("choose_location_to_display_on_map")}
				</p>
			</div>
		</div>
	);
};
