import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "~/shared/components/ui/label";
import { Select, type SelectProps } from "~/shared/components/ui/select";

type Props = Omit<SelectProps, "options">;

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
			<Label htmlFor={id}>{t("your_occupation")}</Label>
			<Select
				{...mergedProps}
				options={[
					{ label: "employed", value: "employed" },
					{ label: "student", value: "student" },
					{ label: "unemployed", value: "unemployed" },
					{ label: "other", value: "other" },
				]}
				placeholder="select_occupation"
			/>
		</fieldset>
	);
};
