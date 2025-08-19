import { LocationForm } from "~/features/publish-room/ui/2-location/step";
export function meta() {
	return [
		{ title: "Location Details | Flatmatch" },
		{ content: "Add location details", name: "description" },
	];
}
export default function Step2Route() {
	return <LocationForm />;
}
