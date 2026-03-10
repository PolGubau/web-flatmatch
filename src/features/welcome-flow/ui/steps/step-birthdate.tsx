import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";
import { cn } from "~/shared/utils/utils";

interface StepBirthdateProps {
	defaultBirthdate?: string;
	onSubmit: (birthdate: string) => void;
	isLoading?: boolean;
}

/**
 * Step para capturar la fecha de nacimiento
 * Valida que el usuario sea mayor de 18 años
 */
export const StepBirthdate = ({
	defaultBirthdate,
	onSubmit,
	isLoading,
}: StepBirthdateProps) => {
	const [birthdate, setBirthdate] = useState(defaultBirthdate ?? "");
	const [error, setError] = useState("");

	const validateAge = (date: string): boolean => {
		const today = new Date();
		const birth = new Date(date);
		const age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birth.getDate())
		) {
			return age - 1 >= 18;
		}

		return age >= 18;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!birthdate) {
			setError("Birthdate is required");
			return;
		}

		if (!validateAge(birthdate)) {
			setError("You must be at least 18 years old");
			return;
		}

		setError("");
		onSubmit(birthdate);
	};

	// Calcular edad actual
	const getAge = (date: string): number | null => {
		if (!date) return null;
		const today = new Date();
		const birth = new Date(date);
		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birth.getDate())
		) {
			age--;
		}

		return age;
	};

	const age = birthdate ? getAge(birthdate) : null;

	return (
		<form className="form space-y-6" onSubmit={handleSubmit}>
			<div className="text-center space-y-2">
				<div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
					<HugeiconsIcon
						className="text-primary"
						icon={Calendar03Icon}
						size={32}
					/>
				</div>
				<h2 className="text-2xl font-bold">When's your birthday?</h2>
				<p className="text-sm text-foreground/60">
					You must be at least 18 years old to use Flatmatch
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
						max={new Date().toISOString().split("T")[0]}
						onChange={(e) => {
							setBirthdate(e.target.value);
							if (error) setError("");
						}}
						type="date"
						value={birthdate}
					/>
					{error && (
						<p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
							{error}
						</p>
					)}
					{age !== null && age >= 18 && (
						<p className="text-xs text-foreground/60 text-center animate-in fade-in">
							You're {age} years old
						</p>
					)}
				</div>

				<p className="text-xs text-foreground/50 text-center">
					Your age will be visible to other users
				</p>
			</div>

			<Button
				className="w-full"
				disabled={isLoading || !birthdate}
				size="lg"
				type="submit"
			>
				{isLoading ? "Saving..." : "Continue"}
			</Button>
		</form>
	);
};
