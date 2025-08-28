import { useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router";
import RegisterForm, { type RegisterCredentials } from "~/features/auth/ui/pages/register-form ";
import { useAuth } from "~/global/supabase/auth-context";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";
import { toast } from "~/shared/components/ui/sonner";

export function meta() {
	return [
		{ title: "Register | Flatmatch" },
		{ content: "Register with other users | Flatmatch", name: "description" },
	];
}

export default function Register() {
	const { session, signUp } = useAuth();

	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	if (session) return <Navigate to="/" />;

	const handleSubmit = async ({ email, password }: RegisterCredentials) => {
		setError(null);
		setLoading(true);

		const res = await signUp({ email, password });
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
				<h1 className="text-2xl font-bold">Nice to meet you!</h1>
				<p className="text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link className="text-primary underline" to="/auth/login">
						Sign in
					</Link>
				</p>
			</header>
			<RegisterForm error={error} loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
