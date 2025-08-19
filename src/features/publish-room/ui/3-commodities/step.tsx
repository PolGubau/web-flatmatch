import { zodResolver } from "@hookform/resolvers/zod";
import {
	BedBunkIcon,
	BedIcon,
	CarParking02Icon,
	Coffee02Icon,
	DishWasherIcon,
	HairDryerIcon,
	MicrowaveIcon,
	OvenIcon,
	PoolIcon,
	RefrigeratorIcon,
	Shirt01Icon,
	Sink01Icon,
	SquareArrowExpand01Icon,
	TerraceIcon,
	Tree04Icon,
	Tv01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { Input } from "~/shared/components/ui/input";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

const Step3Schema = EditableRoomSchema.pick({
	commodities: true,
});
export type Step3SchemaType = z.infer<typeof Step3Schema>;
export function CommoditiesForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step3SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step3Schema),
	});

	return (
		<form
			className="grid grid-rows-[1fr_auto] gap-2 h-full"
			onSubmit={handleSubmit(
				(values) => {
					setData(values);
					// navigate("/publish/location", { replace: true });
				},
				(errors) => {
					console.error(errors);
				},
			)}
		>
			<fieldset className="flex flex-col gap-6">
				<legend className="text-lg pb-12">Select commodities</legend>
				<header className="grid grid-cols-2 gap-4 items-center">
					<div>
						<label className="flex gap-2" htmlFor="area">
							<span className="text-sm">Area (in m²)</span>
						</label>
						<Input
							icon={SquareArrowExpand01Icon}
							id="area"
							max={999}
							min={0}
							type="number"
							{...register("commodities.whole.area.value", {
								required: true,
								valueAsNumber: true,
							})}
						/>
					</div>
					<div>
						<label className="flex gap-2" htmlFor="bathrooms">
							<span className="text-sm">Bathrooms</span>
						</label>
						<Input
							icon={Sink01Icon}
							id="bathrooms"
							max={10}
							min={0}
							type="number"
							{...register("commodities.whole.bathrooms", {
								required: true,
								valueAsNumber: true,
							})}
						/>
					</div>
				</header>
				<div>
					<span>Bedrooms</span>
					<ul className="grid grid-cols-2 gap-4 items-center">
						<li>
							<label className="flex gap-2" htmlFor="bathrooms-ind">
								<span className="text-sm">Private</span>
							</label>
							<Input
								icon={BedIcon}
								id="bathrooms-ind"
								max={10}
								min={0}
								type="number"
								{...register("commodities.whole.bedrooms.individual", {
									required: true,
									valueAsNumber: true,
								})}
							/>
						</li>
						<li>
							<label className="flex gap-2" htmlFor="bathrooms-shared">
								<span className="text-sm">Shared</span>
							</label>
							<Input
								icon={BedBunkIcon}
								id="bathrooms-shared"
								max={999}
								min={0}
								type="number"
								{...register("commodities.whole.bedrooms.shared", {
									required: true,
									valueAsNumber: true,
								})}
							/>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-1">
					<h3>Apartment appliances</h3>
					<ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
						{Object.entries(data.commodities.whole.appliances).map(([key, value]) => {
							const field = register(`commodities.whole.appliances.${key}` as any);
							const data = commoditiesMap[key];
							return (
								<li className="flex group cursor-pointer" key={key}>
									<label
										className={
											"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
										}
									>
										<div className="flex gap-2">
											<HugeiconsIcon icon={data.icon} size={20} />
											<span className="text-sm line-clamp-1">{data.label}</span>
										</div>
										<input className="sr-only" type="checkbox" {...field} defaultChecked={value} />
									</label>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex flex-col gap-1">
					<h3>Extra spaces</h3>
					<ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
						{Object.entries(data.commodities.whole.extras).map(([key, value]) => {
							const field = register(`commodities.whole.extras.${key}` as any);
							const data = extrasMap[key];
							return (
								<li className="flex group cursor-pointer" key={key}>
									<label
										className={
											"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
										}
									>
										<div className="flex gap-2">
											<HugeiconsIcon icon={data.icon} size={20} />
											<span className="text-sm">{data.label}</span>
										</div>
										<input className="sr-only" type="checkbox" {...field} defaultChecked={value} />
									</label>
								</li>
							);
						})}
					</ul>
				</div>
				<div>
					<label className="flex gap-2 items-center p-2 has-checked:bg-primary/20 bg-foreground/5 rounded-xl px-4 w-fit">
						<input type="checkbox" {...register("commodities.whole.areUtilitiesIncluded")} />
						<span className="">Are utilities included?</span>
					</label>
				</div>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.commodities && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">{JSON.stringify(errors)}</p>
				)}
				<FormFooterButtons backHref={"/publish/location"} />
			</footer>
		</form>
	);
}

const extrasMap: Record<string, { label: string; icon: IconSvgElement }> = {
	hasGarden: {
		icon: Tree04Icon,
		label: "Garden",
	},
	hasParking: {
		icon: CarParking02Icon,
		label: "Parking",
	},
	hasPool: {
		icon: PoolIcon,
		label: "Pool",
	},
	hasTerrace: {
		icon: TerraceIcon,
		label: "Terrace",
	},
};

const commoditiesMap: Record<string, { label: string; icon: IconSvgElement }> = {
	hasCoffeeMaker: {
		icon: Coffee02Icon,
		label: "Coffee Maker",
	},
	hasDishwasher: {
		icon: DishWasherIcon,
		label: "Dishwasher",
	},
	hasDryer: {
		icon: HairDryerIcon,
		label: "Dryer",
	},
	hasMicrowave: {
		icon: MicrowaveIcon,
		label: "Microwave",
	},
	hasOven: {
		icon: OvenIcon,
		label: "Oven",
	},
	hasRefrigerator: {
		icon: RefrigeratorIcon,
		label: "Refrigerator",
	},
	hasTV: {
		icon: Tv01Icon,
		label: "TV",
	},
	hasWashingMachine: {
		icon: Shirt01Icon,
		label: "Wash Machine",
	},
};
