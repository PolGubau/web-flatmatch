import { Mail01Icon } from "@hugeicons/core-free-icons";
import { AlertCircle, AlertCircleIcon, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";
import { PasswordInput } from "~/shared/components/ui/input/password-input";

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
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (emailError || !email || !password) return;
		onSubmit({ email, password });
	};

	const isFormValid = email && password && !emailError;

	return (
		<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
			{error && (
				<div className="flex items-start gap-2 text-sm text-error bg-error/10 p-3 rounded-lg border border-error/20 animate-in fade-in slide-in-from-top-1 duration-300">
					<AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
					<p>{error}</p>
				</div>
			)}

			<div className="flex flex-col gap-4">
				<div className="space-y-1.5">
					<div className="relative">
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
					</div>
					{emailError && (
						<p className="text-xs pl-1 text-error text-destructive flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
							<AlertCircleIcon size={16} />
							{emailError}
						</p>
					)}
				</div>

				<div className="space-y-1.5">
					<PasswordInput
						autoComplete="current-password"
						className="pl-10 pr-10"
						label="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
						value={password}
					/>
					<div className="flex justify-end">
						<Link className="text-xs text-primary hover:underline" to="#">
							Forgot password?
						</Link>
					</div>
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
						Signing in...
					</>
				) : (
					"Sign in"
				)}
			</Button>
		</form>
	);
}
