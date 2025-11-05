import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { Link } from "react-router";
import type { TranslationKey } from "../i18n/i18n";

type GoHomeButtonProps = {
	label?: TranslationKey;
	hasLabel?: boolean;
};
export function GoHomeButton({
	label = "go_home",
	hasLabel = true,
}: GoHomeButtonProps) {
	return (
		<Link className="text-sm hover:underline w-fit flex items-center" to={"/"}>
			<HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
			{hasLabel && t(label)}
		</Link>
	);
}
