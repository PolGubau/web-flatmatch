import type React from "react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/shared/components/ui/select";

type Props = React.ComponentPropsWithoutRef<typeof Select>;

export const OccupationField = ({ ...props }: Props) => {
	const id = useId();
	const { t } = useTranslation();
	const definedProps = {
		id,
		name: "occupation",
	};
	// extern props must override defined ones
	const mergedProps = { ...definedProps, ...props };

	return (
		<fieldset className="grid md:grid-cols-[1fr_2fr] gap-2">
			<label className="text-sm font-medium px-2" htmlFor={id}>
				{t("your_occupation")}
			</label>
			<Select {...mergedProps}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder={t("select_occupation")} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="employed">{t("employed")}</SelectItem>
					<SelectItem value="student">{t("student")}</SelectItem>
					<SelectItem value="unemployed">{t("unemployed")}</SelectItem>
					<SelectItem value="other">{t("other")}</SelectItem>
				</SelectContent>
			</Select>
		</fieldset>
	);
};
