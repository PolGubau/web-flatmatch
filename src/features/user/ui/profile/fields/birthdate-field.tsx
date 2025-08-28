import type React from "react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { Input } from "~/shared/components/ui/input/input";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">;

export const BirthdateField = ({ ...props }: Props) => {
	const id = useId();
	const { t } = useTranslation();
	const definedProps = {
		id,
		maxLength: 200,
		name: "aboutMe",
		placeholder: t("bio_placeholder"),
	};
	// extern props must override defined ones
	const mergedProps = { ...definedProps, ...props };

	return (
		<fieldset className="grid md:grid-cols-[1fr_2fr] gap-2">
			<label className="text-sm font-medium px-2" htmlFor={id}>
				{t("birthdate")}
			</label>
			<Input type="date" {...mergedProps} />
			<DatePicker />
		</fieldset>
	);
};
