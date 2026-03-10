import { t } from "i18next";
import { BriefcaseIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input/input";
import { Label } from "~/shared/components/ui/label";
import {
	Select
} from "~/shared/components/ui/select";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";

interface StepOccupationProps {
	defaultOccupation?: string;
	defaultOccupationType?: string;
	onSubmit: (data: { occupation: string; occupationType: string }) => void;
	isLoading?: boolean;
}

const OCCUPATION_TYPES: { label: TranslationKey; value: string }[] = [
	{ label: "student", value: "student" },
	{ label: "employed", value: "employed" },
	{ label: "self_employed", value: "self-employed" },
	{ label: "freelancer", value: "freelancer" },
	{ label: "unemployed", value: "unemployed" },
	{ label: "other", value: "other" },
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
					<BriefcaseIcon className="text-primary" size={32} />
				</div>
				<h2 className="text-2xl font-bold">{t("what_do_you_do")}</h2>
				<p className="text-sm text-muted-foreground">
					{t("this_helps_us_match_you_with_compatible_roommates")}
				</p>
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Select
						disabled={isLoading}
						id="occupation-type"
						label={t("i_am_a")}
						onValueChange={(value) => {
							setOccupationType(value);
							if (error) setError("");
						}}
						options={OCCUPATION_TYPES.map((type) => ({
							label: type.label,
							value: type.value,
						}))}
						placeholder={t("select_occupation_type")}
						value={occupationType}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="occupation">
						{occupationType === "student"
							? "What are you studying?"
							: "What's your job title?"}
					</Label>
					<Input
						className={cn(error && !occupation && "border-destructive")}
						disabled={isLoading}
						id="occupation"
						onChange={(e) => {
							setOccupation(e.target.value);
							if (error) setError("");
						}}
						placeholder={
							occupationType === "student"
								? "e.g., Computer Science"
								: "e.g., Software Engineer"
						}
						type="text"
						value={occupation}
					/>
				</div>

				{error && (
					<p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
						{error}
					</p>
				)}
			</div>

			<Button
				className="w-full"
				disabled={isLoading || !occupation.trim() || !occupationType}
				size="lg"
				type="submit"
			>
				{isLoading ? "Saving..." : "Continue"}
			</Button>
		</form>
	);
};
