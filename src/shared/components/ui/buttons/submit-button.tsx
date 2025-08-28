import type React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../button";
import { Loader } from "../loader";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading?: boolean;
};
export const SubmitButton = ({ isLoading, ...props }: Props) => {
	const { t } = useTranslation();
	return (
		<Button className="w-fit" disabled={!!isLoading} type="submit" {...props}>
			{isLoading ? (
				<>
					<Loader />
					{t("saving")}
				</>
			) : (
				t("save")
			)}
		</Button>
	);
};
