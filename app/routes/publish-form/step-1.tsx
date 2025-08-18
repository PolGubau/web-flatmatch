import { Step1 } from "~/features/publish-room/ui/1-type/step";

export function meta() {
	return [
		{ title: "Flatmatch" },
		{ content: "Publish your room on Flatmatch", name: "description" },
	];
}

export default function Step1Route() {
	return <Step1 />;
}
