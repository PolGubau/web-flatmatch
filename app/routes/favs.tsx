import FavsPage from "src/global/pages/Favs";

export function meta() {
	return [{ title: "Flatmatch" }, { content: "Welcome to Flatmatch!", name: "description" }];
}

export default function Favs() {
	return <FavsPage />;
}
