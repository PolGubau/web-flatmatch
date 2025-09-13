import { RulesForm } from "~/features/publish-room/ui/7-rules/step";

export function meta() {
	return [
		{ title: "Timings of the property | Flatmatch" },
		{ content: "Which are the timings of the property?", name: "description" },
	];
}
export default function Step8Route() {
	return <RulesForm />;
}
