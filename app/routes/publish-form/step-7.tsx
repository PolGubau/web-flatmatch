import { RulesForm } from "~/features/publish-room/ui/7-rules/step";

export function meta() {
	return [
		{ title: "Rules of the property | Flatmatch" },
		{ content: "Which are the rules of the property?", name: "description" },
	];
}
export default function Step7Route() {
	return <RulesForm />;
}
