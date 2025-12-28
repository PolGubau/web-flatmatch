import { type HTMLAttributes, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "~/shared/utils/utils";
import type { TranslationKey } from "../../i18n/i18n";
import { Spinner } from "../ui/spinner";

type Props = HTMLAttributes<HTMLDivElement> & {
	label?: TranslationKey;
	delay?: number;
	type?: "fullscreen" | "bar";
};
export const LoadingSection: React.FC<Props> = ({
	label = "loading",
	delay = 0,
	type = "fullscreen",
	...props
}) => {
	const { t } = useTranslation();
	const [show, setShow] = useState(delay === 0);

	useEffect(() => {
		if (delay > 0) {
			const timer = setTimeout(() => setShow(true), delay);
			return () => clearTimeout(timer);
		}
	}, [delay]);

	if (!show) return null;

	if (type === "bar") {
		return (
			<div className="fixed top-0 left-0 right-0 z-50">
				<div className="h-1 bg-primary/20 overflow-hidden">
					<div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]" />
				</div>
			</div>
		);
	}

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
