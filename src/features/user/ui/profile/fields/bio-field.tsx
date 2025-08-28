import type React from "react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Textarea } from "~/shared/components/ui/textarea";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const BioField = ({ ...props }: Props) => {
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
				{t("introduce_yourself")}
			</label>
			<Textarea {...mergedProps} />
		</fieldset>
	);
};
