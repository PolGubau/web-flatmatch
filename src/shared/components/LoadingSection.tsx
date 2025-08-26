import { Loading02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { TranslationKey } from "../i18n/i18n";

type Props = {
	title?: TranslationKey;
};
export const LoadingSection = ({ title = "loading" }: Props) => {
	const { t } = useTranslation();
	return (
		<div className="w-full h-full grid place-items-center p-4">
			<div className="flex flex-col gap-2 items-center">
				<HugeiconsIcon className="animate-rotate" icon={Loading02Icon} />
				{t(title)}
			</div>
		</div>
	);
};
