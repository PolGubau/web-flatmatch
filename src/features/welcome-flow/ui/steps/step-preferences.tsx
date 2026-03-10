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
	{ label: "Private room", value: "private" },
	{ label: "Shared room", value: "shared" },
	{ label: "Studio/Apartment", value: "studio" },
	{ label: "Any type", value: "any" },
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
					<HugeiconsIcon className="text-primary" icon={Home01Icon} size={32} />
				</div>
				<h2 className="text-2xl font-bold">What are you looking for?</h2>
				<p className="text-sm text-muted-foreground">
					Help us find the perfect room for you
				</p>
			</div>

			<div className="space-y-4">
				{/* Ciudad */}
				<div className="space-y-2">
					<Label className="flex items-center gap-2" htmlFor="city">
						<HugeiconsIcon icon={Location01Icon} size={16} />
						City
					</Label>
					<Input
						className={cn(error && !city && "border-destructive")}
						disabled={isLoading}
						id="city"
						list="cities"
						onChange={(e) => {
							setCity(e.target.value);
							if (error) setError("");
						}}
						placeholder="e.g., Barcelona"
						type="text"
						value={city}
					/>
					<datalist id="cities">
						{POPULAR_CITIES.map((c) => (
							<option key={c} value={c} />
						))}
					</datalist>
				</div>

				{/* Presupuesto */}
				<div className="space-y-2">
					<Label className="flex items-center gap-2" htmlFor="budget">
						<EuroIcon size={16} />
						Maximum budget (per month)
					</Label>
					<div className="relative">
						<Input
							className={cn(
								"pr-12",
								error && !maxBudget && "border-destructive",
							)}
							disabled={isLoading}
							id="budget"
							min="0"
							onChange={(e) => {
								setMaxBudget(e.target.value);
								if (error) setError("");
							}}
							placeholder="500"
							step="50"
							type="number"
							value={maxBudget}
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
							€/mo
						</span>
					</div>
				</div>

				{/* Tipo de habitación */}
				<div className="space-y-2">
					<Label htmlFor="room-type">Room type</Label>
					<Select
						disabled={isLoading}
						onValueChange={(value) => {
							setRoomType(value);
							if (error) setError("");
						}}
						value={roomType}
					>
						<SelectTrigger
							className={cn(error && !roomType && "border-destructive")}
							id="room-type"
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
					<p className="text-xs text-destructive animate-in fade-in">{error}</p>
				)}
			</div>

			<div className="space-y-3">
				<Button className="w-full" disabled={isLoading} size="lg" type="submit">
					{isLoading ? "Saving..." : "Continue"}
				</Button>

				{onSkip && (
					<Button
						className="w-full"
						disabled={isLoading}
						onClick={onSkip}
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
