import { LockIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import {
	AlertCircleIcon,
	CheckCircle2,
	Eye,
	EyeOff,
	Loader2,
	Lock,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { Alert, AlertTitle } from "~/shared/components/ui/alert";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";
import { PasswordInput } from "~/shared/components/ui/input/password-input";
import { cn } from "~/shared/utils/utils";

export type RegisterCredentials = {
	email: string;
	password: string;
};
type Props = {
	onSubmit: (data: RegisterCredentials) => void;
	error: string | null;
	loading: boolean;
};

type PasswordStrength = "weak" | "medium" | "strong";

export default function RegisterForm({ onSubmit, error, loading }: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordTouched, setPasswordTouched] = useState(false);

	const validateEmail = (value: string) => {
		if (!value) {
			setEmailError("");
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			setEmailError("Please enter a valid email address");
		} else {
			setEmailError("");
		}
	};

	const passwordStrength: PasswordStrength = useMemo(() => {
		if (password.length === 0) return "weak";
		let strength = 0;
		if (password.length >= 8) strength++;
		if (password.length >= 12) strength++;
		if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
		if (/[0-9]/.test(password)) strength++;
		if (/[^a-zA-Z0-9]/.test(password)) strength++;

		if (strength <= 2) return "weak";
		if (strength <= 4) return "medium";
		return "strong";
	}, [password]);

	const passwordRequirements = [
		{ met: password.length >= 8, text: "At least 8 characters" },
		{
			met: /[a-z]/.test(password) && /[A-Z]/.test(password),
			text: "Upper & lowercase letters",
		},
		{ met: /[0-9]/.test(password), text: "At least one number" },
	];

	const passwordsMatch = password === confirmPassword;
	const showPasswordMismatch = confirmPassword.length > 0 && !passwordsMatch;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (emailError || !email || !password || !passwordsMatch) return;
		onSubmit({ email, password });
	};

	const isFormValid =
		email && password && passwordsMatch && !emailError && password.length >= 8;

	return (
		<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
			{error && (
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertTitle>{error}</AlertTitle>
				</Alert>
			)}

			<div className="flex flex-col gap-4">
				<div className="space-y-1.5">
					<Input
						autoComplete="email"
						autoFocus
						className="pl-10"
						icon={Mail01Icon}
						label="email"
						name="email"
						onBlur={() => validateEmail(email)}
						onChange={(e) => {
							setEmail(e.target.value);
							if (emailError) validateEmail(e.target.value);
						}}
						placeholder="you@example.com"
						required
						type="email"
						value={email}
					/>
					{emailError && (
						<p className="text-xs text-error animate-in fade-in slide-in-from-top-1 duration-200">
							{emailError}
						</p>
					)}
				</div>
				<PasswordInput
					autoComplete="new-password"
					className="pl-10 pr-10"
					icon={LockIcon}
					label="password"
					name="password"
					onBlur={() => setPasswordTouched(true)}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Create a strong password"
					required
					value={password}
				/>

				<ul className="space-y-1.5">
					{password.length > 0 && (
						<li className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
							<div className="flex gap-1">
								<div
									className={cn(
										"h-1 flex-1 rounded-full transition-all duration-300",
										{
											"bg-green-500": passwordStrength === "strong",
											"bg-red-500": passwordStrength === "weak",
											"bg-yellow-500": passwordStrength === "medium",
										},
									)}
								/>
								<div
									className={cn(
										`h-1 flex-1 rounded-full transition-all duration-300`,
										{
											"bg-green-500": passwordStrength === "strong",
											"bg-muted": passwordStrength === "weak",
											"bg-yellow-500": passwordStrength === "medium",
										},
									)}
								/>
								<div
									className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordStrength === "strong" ? "bg-green-500" : "bg-muted"
										}`}
								/>
							</div>
							<p className="text-xs text-muted-foreground">
								Password strength:{" "}
								<span
									className={`font-medium ${passwordStrength === "weak"
										? "text-red-500"
										: passwordStrength === "medium"
											? "text-yellow-500"
											: "text-green-500"
										}`}
								>
									{passwordStrength.charAt(0).toUpperCase() +
										passwordStrength.slice(1)}
								</span>
							</p>
						</li>
					)}

					{passwordTouched && password.length > 0 && (
						<li className="space-y-1 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
							{passwordRequirements.map((req, idx) => (
								<div
									className={`flex items-center gap-1.5 ${req.met ? "text-green-600" : "text-muted-foreground"
										}`}
									// biome-ignore lint/suspicious/noArrayIndexKey: Ok
									key={idx}
								>
									<CheckCircle2 className="w-3 h-3" />
									<span>{req.text}</span>
								</div>
							))}
						</li>
					)}
				</ul>

				<div className="space-y-1.5">
					<PasswordInput
						autoComplete="new-password"
						className="pl-10 pr-10"
						icon={LockIcon}
						label="confirm_password"
						name="confirm-password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Re-enter your password"
						required
						value={confirmPassword}
					/>


					{showPasswordMismatch && (
						<p className="text-xs text-error animate-in fade-in slide-in-from-top-1 duration-200">
							Passwords do not match
						</p>
					)}
					{passwordsMatch && confirmPassword.length > 0 && (
						<p className="text-xs text-green-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
							<CheckCircle2 className="w-3 h-3" />
							Passwords match
						</p>
					)}
				</div>
			</div>

			<Button
				className="w-full h-11"
				disabled={loading || !isFormValid}
				type="submit"
			>
				{loading ? (
					<>
						<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						Creating account...
					</>
				) : (
					"Create account"
				)}
			</Button>
		</form>
	);
}
