import { Step1 } from "~/features/publish-room/ui/step1-type";

export function meta() {
	return [{ title: "Flatmatch" }, { content: "Welcome to Flatmatch!", name: "description" }];
}

export default function Step1Route() {
	return <Step1 />;
}
