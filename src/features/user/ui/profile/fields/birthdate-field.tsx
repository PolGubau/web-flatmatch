import type React from "react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import type { Calendar } from "~/shared/components/ui/calendar";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { Label } from "~/shared/components/ui/label";

type Props = React.ComponentProps<typeof Calendar> & {
	defaultValue?: string | null;
};

export const BirthdateField = ({ ...props }: Props) => {
	const id = useId();
	const { t } = useTranslation();
	const definedProps = {
		id,
		name: "birthDate",
		placeholder: t("birthdate_placeholder"),
	};
	// extern props must override defined ones
	const mergedProps = { ...definedProps, ...props };

	return (
		<fieldset className="grid md:grid-cols-[1fr_2fr] gap-2">
			<Label htmlFor={id}>{t("birthdate")}</Label>
			<DatePicker {...mergedProps} />
		</fieldset>
	);
};
