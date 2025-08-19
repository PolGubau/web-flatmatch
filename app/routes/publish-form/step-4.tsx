import { CompanyForm } from "~/features/publish-room/ui/4-company/step";

export function meta() {
	return [
		{ title: "People Details | Flatmatch" },
		{ content: "Who is living in the property?", name: "description" },
	];
}
export default function Step4Route() {
	return <CompanyForm />;
}
