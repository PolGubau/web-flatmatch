import FavsPage from "src/global/pages/Favs";

export function meta() {
	return [{ title: "Flatmatch" }, { content: "Welcome to Flatmatch!", name: "description" }];
}

export default function Favs() {
	return (
		<div className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto px-4 md:px-6 ">
			<FavsPage />
		</div>
	);
}
