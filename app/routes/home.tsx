import HomePage from "src/global/pages/Home";

export function meta() {
	return [
		{ title: "Flatmatch" },
		{ content: "Welcome to Flatmatch!", name: "description" },
	];
}

export default function Home() {
	return <HomePage />;
}
