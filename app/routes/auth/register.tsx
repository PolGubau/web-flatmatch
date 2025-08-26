import { Form, Link } from "react-router";
import { userAuth } from "~/global/supabase/auth-context";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import type { Route } from "./+types/register";

export function meta() {
	return [
		{ title: "Register | Flatmatch" },
		{ content: "Register with other users | Flatmatch", name: "description" },
	];
}

export default function Register() {
	const { session, signUp } = userAuth();
	console.log(session);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email || !password) {
			console.error("Email and password are required");
			return;
		}

		const user = await signUp({ email, password });
		console.log(user);
	};

	return (
		<div className="max-w-4xl w-full mx-auto p-4 flex flex-col items-center justify-center h-full">
			<form className="flex gap-4 flex-col" method="POST" onSubmit={handleSubmit}>
				<h2>Sign up today!</h2>
				<p className="text-sm">
					Already have an account?{" "}
					<Link className="text-info" to="/auth/login">
						Sign in!
					</Link>
				</p>
				<div className="flex flex-col py-4 gap-2">
					<Input label="Email" name="email" placeholder="Email" type="text" />
					<Input label="Password" name="password" placeholder="Password" type="password" />
					<Button type="submit">Sign up</Button>
				</div>
			</form>
		</div>
	);
}
