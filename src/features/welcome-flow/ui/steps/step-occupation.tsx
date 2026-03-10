import { BriefcaseIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";
import { Label } from "~/shared/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/shared/components/ui/select";
import { cn } from "~/shared/utils/utils";

interface StepOccupationProps {
	defaultOccupation?: string;
	defaultOccupationType?: string;
	onSubmit: (data: { occupation: string; occupationType: string }) => void;
	isLoading?: boolean;
}

const OCCUPATION_TYPES = [
	{ value: "student", label: "Student" },
	{ value: "employed", label: "Employed" },
	{ value: "self-employed", label: "Self-employed" },
	{ value: "freelancer", label: "Freelancer" },
	{ value: "unemployed", label: "Looking for work" },
	{ value: "other", label: "Other" },
];

/**
 * Step para capturar ocupación del usuario
 */
export const StepOccupation = ({
	defaultOccupation,
	defaultOccupationType,
	onSubmit,
	isLoading,
}: StepOccupationProps) => {
	const [occupation, setOccupation] = useState(defaultOccupation ?? "");
	const [occupationType, setOccupationType] = useState(
		defaultOccupationType ?? "",
	);
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!occupation.trim()) {
			setError("Please tell us what you do");
			return;
		}

		if (!occupationType) {
			setError("Please select your occupation type");
			return;
		}

		setError("");
		onSubmit({
			occupation: occupation.trim(),
			occupationType,
		});
	};

	return (
		<form className="form space-y-6" onSubmit={handleSubmit}>
			<div className="text-center space-y-2">
				<div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
					<BriefcaseIcon size={32} className="text-primary" />
				</div>
				<h2 className="text-2xl font-bold">What do you do?</h2>
				<p className="text-sm text-foreground/60">
					This helps us match you with compatible roommates
				</p>
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="occupation-type">I am a...</Label>
					<Select
						value={occupationType}
						onValueChange={(value) => {
							setOccupationType(value);
							if (error) setError("");
						}}
						disabled={isLoading}
					>
						<SelectTrigger
							id="occupation-type"
							className={cn(
								error && !occupationType && "border-destructive",
							)}
						>
							<SelectValue placeholder="Select your status" />
						</SelectTrigger>
						<SelectContent>
							{OCCUPATION_TYPES.map((type) => (
								<SelectItem key={type.value} value={type.value}>
									{type.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="occupation">
						{occupationType === "student"
							? "What are you studying?"
							: "What's your job title?"}
					</Label>
					<Input
						id="occupation"
						type="text"
						placeholder={
							occupationType === "student"
								? "e.g., Computer Science"
								: "e.g., Software Engineer"
						}
						value={occupation}
						onChange={(e) => {
							setOccupation(e.target.value);
							if (error) setError("");
						}}
						className={cn(
							error && !occupation && "border-destructive",
						)}
						disabled={isLoading}
					/>
				</div>

				{error && (
					<p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
						{error}
					</p>
				)}
			</div>

			<Button
				type="submit"
				className="w-full"
				disabled={isLoading || !occupation.trim() || !occupationType}
				size="lg"
			>
				{isLoading ? "Saving..." : "Continue"}
			</Button>
		</form>
	);
};

