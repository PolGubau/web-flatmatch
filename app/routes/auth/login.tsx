export function meta() {
	return [
		{ title: "Login | Flatmatch" },
		{ content: "Login with other users | Flatmatch", name: "description" },
	];
}

type Props = {
	redirectedByGuard?: boolean;
};
export default function LoginPage({ redirectedByGuard = false }: Props) {
	console.log(`redirectedByGuard: ${redirectedByGuard}`);
	return (
		<div>
			<form>
				<h2>Login</h2>
			</form>
		</div>
	);
}
