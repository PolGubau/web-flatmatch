import { PreferencesForm } from "~/features/publish-room/ui/6-preferences/step";

export function meta() {
	return [
		{ title: "Preferences Details | Flatmatch" },
		{
			content: "What are you searching for the property?",
			name: "description",
		},
	];
}
export default function Step6Route() {
	return <PreferencesForm />;
}
