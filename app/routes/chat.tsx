import { PleaseSignInPage } from "~/shared/components/pages/PleaseSignInPage";
import { useSession } from "~/shared/context/session-context";

export function meta() {
	return [
		{ title: "Chat | Flatmatch" },
		{ content: "Chat with other users | Flatmatch", name: "description" },
	];
}

export default function Chat() {
	const { session } = useSession();

	if (!session) {
		return <PleaseSignInPage />;
	}
	return (
		<section className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto px-4 md:px-6 flex flex-col gap-4">
			<h1 className="text-xl font-semibold">Chat</h1>
			<p>Chat isn't available yet.</p>
		</section>
	);
}
