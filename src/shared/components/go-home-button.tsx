import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { Link } from "react-router";

export function GoHomeButton() {
	return (
		<Link className="text-sm hover:underline w-fit flex items-center" to={"/"}>
			<HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
			{t("go_home")}
		</Link>
	);
}
