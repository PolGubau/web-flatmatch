import HomePage from "~/global/pages/home/Home";

export function meta() {
	return [
		{ title: "Flatmatch" },
		{ content: "Welcome to Flatmatch!", name: "description" },
	];
}

export default function Home() {
	return <HomePage />;
}
