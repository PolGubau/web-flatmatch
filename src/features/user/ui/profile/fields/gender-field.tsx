import type React from "react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "~/shared/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/shared/components/ui/select";

type Props = React.ComponentPropsWithoutRef<typeof Select>;

export const GenderField = ({ ...props }: Props) => {
	const id = useId();
	const { t } = useTranslation();
	const definedProps = {
		id,
		name: "gender",
	};
	// extern props must override defined ones
	const mergedProps = { ...definedProps, ...props };

	return (
		<fieldset className="grid md:grid-cols-[1fr_2fr] gap-2">
			<Label htmlFor={id}>{t("your_gender")}</Label>
			<Select {...mergedProps}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder={t("select_gender")} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="male">{t("male")}</SelectItem>
					<SelectItem value="female">{t("female")}</SelectItem>
					<SelectItem value="other">{t("other")}</SelectItem>
					<SelectItem value="prefer_not_to_say">{t("prefer_not_to_say")}</SelectItem>
				</SelectContent>
			</Select>
		</fieldset>
	);
};
