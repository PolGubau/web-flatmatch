import type React from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";

export type LoginCredentials = {
	email: string;
	password: string;
};
type Props = {
	onSubmit: (data: LoginCredentials) => void;
	error: string | null;
	loading: boolean;
};
export default function LoginForm({ onSubmit, error, loading }: Props) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		onSubmit({ email, password });
	};
	return (
		<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
			{error && <p className="text-sm text-error bg-error/10 p-2 rounded">{error}</p>}

			<div className="flex flex-col gap-3">
				<Input
					autoComplete="email"
					autoFocus
					label="Email"
					name="email"
					placeholder="you@example.com"
					required
					type="email"
				/>
				<Input
					autoComplete="current-password"
					label="Password"
					name="password"
					placeholder="••••••••"
					required
					type="password"
				/>
			</div>

			<Button className="w-full" disabled={loading} type="submit">
				{loading ? "Signing in..." : "Sign in"}
			</Button>
		</form>
	);
}
