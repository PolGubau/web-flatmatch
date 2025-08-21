import { MetadataForm } from "~/features/publish-room/ui/5-metadata/step";

export function meta() {
	return [
		{ title: "People Details | Flatmatch" },
		{ content: "Who is living in the property?", name: "description" },
	];
}
export default function Step5Route() {
	return <MetadataForm />;
}
