import { Loading02Icon } from "@hugeicons/core-free-icons";
import {
	HugeiconsIcon,
	type HugeiconsIconProps,
	type IconSvgElement,
} from "@hugeicons/react";
import { t } from "i18next";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";

type LoaderProps = Omit<HugeiconsIconProps, "icon"> & {
	icon?: IconSvgElement;
	className?: string;
	labelProps?: React.HTMLAttributes<HTMLSpanElement>;
	label?: TranslationKey;
	iconClassName?: string;
};
export const Loader = ({
	className,
	label,
	labelProps,
	icon = Loading02Icon,
	iconClassName,
	...rest
}: LoaderProps) => {
	return (
		<div className={cn("flex flex-col gap-2 items-center", className)}>
			<HugeiconsIcon
				{...rest}
				className={`animate-rotate ${iconClassName}`}
				icon={icon}
			/>
			{label && (
				<span {...labelProps} className="animate-pulse">
					{t(label)}
				</span>
			)}
		</div>
	);
};
