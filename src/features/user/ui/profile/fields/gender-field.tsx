import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "~/shared/components/ui/label";
import { Select, type SelectProps } from "~/shared/components/ui/select";

type Props = Omit<SelectProps, "options">;

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
			<Select
				{...mergedProps}
				options={[
					{
						label: "male",
						value: "male",
					},
					{
						label: "female",
						value: "female",
					},
					{
						label: "other",
						value: "other",
					},
					{
						label: "prefer_not_to_say",
						value: "prefer_not_to_say",
					},
				]}
				placeholder="select_gender"
			/>
		</fieldset>
	);
};
