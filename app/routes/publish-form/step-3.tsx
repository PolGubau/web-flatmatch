import { CommoditiesForm } from "~/features/publish-room/ui/3-commodities/step";
export function meta() {
	return [
		{ title: "Commodities Details | Flatmatch" },
		{ content: "Add commodities details", name: "description" },
	];
}
export default function Step3Route() {
	return <CommoditiesForm />;
}
