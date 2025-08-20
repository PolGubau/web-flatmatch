import { useTranslation } from "react-i18next";

export function meta() {
	return [{ title: "Flatmatch" }, { content: "Welcome to Flatmatch!", name: "description" }];
}

export default function Chat() {
	const { t } = useTranslation();

	return (
		<>
			<h1>{t("shared")}</h1>
			<p>Hola</p>
		</>
	);
}
