import { LocationForm } from "~/features/publish-room/ui/2-location/step";
export function meta() {
	return [
		{ title: "Flatmatch" },
		{ content: "Publish your room on Flatmatch", name: "description" },
	];
}
export default function Step12oute() {
	return <LocationForm />;
}
