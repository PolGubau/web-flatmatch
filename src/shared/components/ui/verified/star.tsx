import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";

export function VerifiedStar() {
	const { t } = useTranslation();

	return (
		<div
			className="gap-1 flex w-fit items-center rounded-full text-canvas/90 bg-primary/70 backdrop-blur-md p-1 text-xs"
			title={t("verified")}
		>
			<HugeiconsIcon className="fill-canvas/80" icon={StarIcon} size={13} />
		</div>
	);
}
