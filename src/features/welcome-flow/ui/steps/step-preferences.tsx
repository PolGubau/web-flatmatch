import { Home01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { EuroIcon } from "lucide-react";
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

interface StepPreferencesProps {
	onSubmit: (data: {
		city: string;
		maxBudget: number;
		roomType: string;
	}) => void;
	onSkip?: () => void;
	isLoading?: boolean;
}

const ROOM_TYPES = [
	{ value: "private", label: "Private room" },
	{ value: "shared", label: "Shared room" },
	{ value: "studio", label: "Studio/Apartment" },
	{ value: "any", label: "Any type" },
];

const POPULAR_CITIES = [
	"Barcelona",
	"Madrid",
	"Valencia",
	"Sevilla",
	"Bilbao",
	"Málaga",
];

/**
 * Step para capturar preferencias de búsqueda
 */
export const StepPreferences = ({
	onSubmit,
	onSkip,
	isLoading,
}: StepPreferencesProps) => {
	const [city, setCity] = useState("");
	const [maxBudget, setMaxBudget] = useState("");
	const [roomType, setRoomType] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!city.trim()) {
			setError("Please enter a city");
			return;
		}

		if (!maxBudget || Number(maxBudget) <= 0) {
			setError("Please enter a valid budget");
			return;
		}

		if (!roomType) {
			setError("Please select a room type");
			return;
		}

		setError("");
		onSubmit({
			city: city.trim(),
			maxBudget: Number(maxBudget),
			roomType,
		});
	};

	return (
		<form className="form space-y-6" onSubmit={handleSubmit}>
			<div className="text-center space-y-2">
				<div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
					<HugeiconsIcon icon={Home01Icon} size={32} className="text-primary" />
				</div>
				<h2 className="text-2xl font-bold">What are you looking for?</h2>
				<p className="text-sm text-foreground/60">
					Help us find the perfect room for you
				</p>
			</div>

			<div className="space-y-4">
				{/* Ciudad */}
				<div className="space-y-2">
					<Label htmlFor="city" className="flex items-center gap-2">
						<HugeiconsIcon icon={Location01Icon} size={16} />
						City
					</Label>
					<Input
						id="city"
						type="text"
						placeholder="e.g., Barcelona"
						value={city}
						onChange={(e) => {
							setCity(e.target.value);
							if (error) setError("");
						}}
						list="cities"
						className={cn(error && !city && "border-destructive")}
						disabled={isLoading}
					/>
					<datalist id="cities">
						{POPULAR_CITIES.map((c) => (
							<option key={c} value={c} />
						))}
					</datalist>
				</div>

				{/* Presupuesto */}
				<div className="space-y-2">
					<Label htmlFor="budget" className="flex items-center gap-2">
						<EuroIcon size={16} />
						Maximum budget (per month)
					</Label>
					<div className="relative">
						<Input
							id="budget"
							type="number"
							placeholder="500"
							value={maxBudget}
							onChange={(e) => {
								setMaxBudget(e.target.value);
								if (error) setError("");
							}}
							min="0"
							step="50"
							className={cn(
								"pr-12",
								error && !maxBudget && "border-destructive",
							)}
							disabled={isLoading}
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/60">
							€/mo
						</span>
					</div>
				</div>

				{/* Tipo de habitación */}
				<div className="space-y-2">
					<Label htmlFor="room-type">Room type</Label>
					<Select
						value={roomType}
						onValueChange={(value) => {
							setRoomType(value);
							if (error) setError("");
						}}
						disabled={isLoading}
					>
						<SelectTrigger
							id="room-type"
							className={cn(error && !roomType && "border-destructive")}
						>
							<SelectValue placeholder="Select room type" />
						</SelectTrigger>
						<SelectContent>
							{ROOM_TYPES.map((type) => (
								<SelectItem key={type.value} value={type.value}>
									{type.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{error && (
					<p className="text-xs text-destructive animate-in fade-in">
						{error}
					</p>
				)}
			</div>

			<div className="space-y-3">
				<Button
					type="submit"
					className="w-full"
					disabled={isLoading}
					size="lg"
				>
					{isLoading ? "Saving..." : "Continue"}
				</Button>

				{onSkip && (
					<Button
						type="button"
						variant="ghost"
						className="w-full"
						onClick={onSkip}
						disabled={isLoading}
					>
						Skip for now
					</Button>
				)}
			</div>
		</form>
	);
};

