import type { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "~/shared/utils/utils";
import type { TranslationKey } from "../../i18n/i18n";
import { Spinner } from "../ui/spinner";

type Props = HTMLAttributes<HTMLDivElement> & {
	label?: TranslationKey;
};
export const LoadingSection: React.FC<Props> = ({
	label = "loading",
	...props
}) => {
	const { t } = useTranslation();
	return (
		<div
			{...props}
			className={cn(
				"w-full h-full bg-background grid place-items-center p-4",
				props.className,
			)}
		>
			<div className="flex flex-col gap-2 items-center">
				<Spinner /> {t(label)}
			</div>
		</div>
	);
};
