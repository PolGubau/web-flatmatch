import { t } from "i18next";
import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import LoginForm, {
	type LoginCredentials,
} from "~/features/auth/ui/pages/login-form";
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
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-1.5">
				<h1 className="text-3xl font-bold tracking-tight">{t("welcome_back")}</h1>
				<p className="text-sm text-muted-foreground">
					{t("dont_have_an_account_yet")}{" "}
					<Link className="text-primary hover:underline font-medium" to="/auth/register">
						{t("sign_up")}
					</Link>
				</p>
			</header>
			<LoginForm error={error} loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
