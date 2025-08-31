import { WelcomePage } from "~/global/pages/Welcome";

export function meta() {
	return [
		{ title: "Welcome to Flatmatch!" },
		{ content: "Welcome to Flatmatch, let's know each other!", name: "description" },
	];
}

export default function WelcomeRoute() {
	return <WelcomePage />;
}
