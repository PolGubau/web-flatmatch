import { t } from "i18next";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import RegisterForm, {
	type RegisterCredentials,
} from "~/features/auth/ui/pages/register-form ";
import { useAuth } from "~/global/supabase/auth-context";

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
				<h1 className="text-2xl font-bold">{t("nice_to_meet_you")}</h1>
				<p className="text-sm text-muted-foreground">
					{t("already_have_an_account")}{" "}
					<Link className="text-primary underline" to="/auth/login">
						{t("sign_in")}
					</Link>
				</p>
			</header>
			<RegisterForm error={error} loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
