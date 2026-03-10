import { SmartPhoneIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";
import { cn } from "~/shared/utils/utils";

interface StepPhoneProps {
	defaultPhone?: string;
	onSubmit: (phone: string) => void;
	onSkip?: () => void;
	isLoading?: boolean;
}

/**
 * Step para capturar el teléfono del usuario
 * Incluye validación básica de formato
 */
export const StepPhone = ({
	defaultPhone,
	onSubmit,
	onSkip,
	isLoading,
}: StepPhoneProps) => {
	const [phone, setPhone] = useState(defaultPhone ?? "");
	const [error, setError] = useState("");

	const validatePhone = (value: string): boolean => {
		// Validación básica: al menos 9 dígitos
		const phoneRegex = /^[+]?[\d\s()-]{9,}$/;
		return phoneRegex.test(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!phone.trim()) {
			setError("Phone number is required");
			return;
		}

		if (!validatePhone(phone)) {
			setError("Please enter a valid phone number");
			return;
		}

		setError("");
		onSubmit(phone.trim());
	};

	const handleSkip = () => {
		if (onSkip) {
			onSkip();
		}
	};

	return (
		<form className="form space-y-6" onSubmit={handleSubmit}>
			<div className="text-center space-y-2">
				<div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
					<HugeiconsIcon
						className="text-primary"
						icon={SmartPhoneIcon}
						size={32}
					/>
				</div>
				<h2 className="text-2xl font-bold">What's your phone number?</h2>
				<p className="text-sm text-muted-foreground">
					We'll use this to help you connect with potential roommates
				</p>
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Input
						autoFocus
						className={cn(
							"text-center text-lg",
							error && "border-destructive focus-visible:ring-destructive",
						)}
						disabled={isLoading}
						onChange={(e) => {
							setPhone(e.target.value);
							if (error) setError("");
						}}
						placeholder="+34 612 345 678"
						type="tel"
						value={phone}
					/>
					{error && (
						<p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
							{error}
						</p>
					)}
				</div>

				<p className="text-xs text-foreground/50 text-center">
					Your phone number will only be visible to users you match with
				</p>
			</div>

			<div className="space-y-3">
				<Button
					className="w-full"
					disabled={isLoading || !phone.trim()}
					size="lg"
					type="submit"
				>
					{isLoading ? "Saving..." : "Continue"}
				</Button>

				{onSkip && (
					<Button
						className="w-full"
						disabled={isLoading}
						onClick={handleSkip}
						type="button"
						variant="ghost"
					>
						Skip for now
					</Button>
				)}
			</div>
		</form>
	);
};
