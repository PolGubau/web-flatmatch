import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import LoginForm, { type LoginCredentials } from "~/features/auth/ui/pages/login-form";
import { useAuth } from "~/global/supabase/auth-context";

export function meta() {
	return [
		{ title: "Login | Flatmatch" },
		{ content: "Login with other users | Flatmatch", name: "description" },
	];
}

export default function LoginPage() {
	const [searchParams] = useSearchParams();

	const { session, signIn } = useAuth();
	if (searchParams.get("redirectedByGuard")) {
		console.info(
			"You are in the login page because you were redirected by the auth guard (session is not found)",
		);
	}
	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	if (session) return <Navigate to="/" />;

	const handleSubmit = async ({ email, password }: LoginCredentials) => {
		setError(null);
		setLoading(true);

		const res = await signIn({ email, password });
		setLoading(false);

		if (!res.success) {
			setError(res.error.message);
		} else {
			navigate("/");
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<header className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold">Welcome back!</h1>
				<p className="text-sm text-muted-foreground">
					Don't have an account?{" "}
					<Link className="text-primary underline" to="/auth/register">
						Sign up
					</Link>
				</p>
			</header>
			<LoginForm error={error} loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
