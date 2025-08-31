import type React from "react";
import { useTranslation } from "react-i18next";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { Button } from "../button";
import { Loader } from "../loader";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading?: boolean;
	labels?: {
		idle: TranslationKey;
		loading: TranslationKey;
	};
};
export const SubmitButton = ({
	isLoading,
	labels = {
		idle: "save",
		loading: "saving",
	},
	...props
}: Props) => {
	const { t } = useTranslation();
	return (
		<Button className="w-fit" disabled={!!isLoading} type="submit" {...props}>
			{isLoading ? (
				<>
					<Loader />
					{t(labels.loading)}
				</>
			) : (
				t(labels.idle)
			)}
		</Button>
	);
};
