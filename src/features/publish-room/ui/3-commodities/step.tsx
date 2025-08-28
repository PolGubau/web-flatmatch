import { zodResolver } from "@hookform/resolvers/zod";
import {
	Bathtub01Icon,
	BedBunkIcon,
	BedIcon,
	DeskIcon,
	PatioIcon,
	Sink01Icon,
	SquareArrowExpand01Icon,
	Wardrobe01Icon,
	WindowsNewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ErrorBoundary } from "app/root";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { commoditiesMap, extrasMap } from "~/shared/base/commodities";
import { Input } from "~/shared/components/ui/input/input";
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

	console.info(errors);

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={handleSubmit(
				(values) => {
					setData(values);
					navigate("/publish/company", { replace: true });
				},
				(errors) => {
					console.error(errors);
				},
			)}
		>
			<fieldset className="grid gap-6 overflow-y-auto">
				<legend className="text-lg pb-10">Select commodities</legend>
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
							placeholder="Enter area in m²"
							{...register("commodities.whole.area", {
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
							placeholder="Enter number of bathrooms"
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
								placeholder="Enter number of private bedrooms"
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
								defaultValue={0}
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
							const data = commoditiesMap[key as keyof typeof commoditiesMap];
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
										<input className="hidden" type="checkbox" {...field} defaultChecked={value} />
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
										<input className="hidden" type="checkbox" {...field} defaultChecked={value} />
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

				<section className="border-t border-foreground/10 pt-4">
					<div className="flex flex-col gap-8">
						<h3>Room appliances</h3>

						<Input
							className="w-fit"
							icon={SquareArrowExpand01Icon}
							id="area"
							label="Area (in m²)"
							max={999}
							min={0}
							placeholder="Enter area in m²"
							{...register("commodities.room.area", {
								required: true,
								valueAsNumber: true,
							})}
						/>
						<div className="flex gap-2 items-center">
							<label htmlFor="bed-type">Bed Type</label>

							<select {...register("commodities.room.bedType")} id="bed-type">
								<option value="single">single</option>
								<option value="double">double</option>
								<option value="bunk">bunk</option>
								<option value="sofa">sofa</option>
								<option value="none">none</option>
							</select>
						</div>

						<ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
							<li className="flex group cursor-pointer">
								<label
									className={
										"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
									}
								>
									<div className="flex gap-2">
										<HugeiconsIcon icon={PatioIcon} size={20} />
										<span className="text-sm line-clamp-1">{"Has Balcony"}</span>
									</div>
									<input
										className="hidden"
										type="checkbox"
										{...register("commodities.room.hasBalcony")}
										defaultChecked={data.commodities.room?.hasBalcony}
									/>
								</label>
							</li>
							<li className="flex group cursor-pointer">
								<label
									className={
										"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
									}
								>
									<div className="flex gap-2">
										<HugeiconsIcon icon={WindowsNewIcon} size={20} />
										<span className="text-sm line-clamp-1">{"Has Window"}</span>
									</div>
									<input
										className="hidden"
										type="checkbox"
										{...register("commodities.room.hasWindow")}
										defaultChecked={data.commodities.room?.hasWindow}
									/>
								</label>
							</li>
							<li className="flex group cursor-pointer">
								<label
									className={
										"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
									}
								>
									<div className="flex gap-2">
										<HugeiconsIcon icon={DeskIcon} size={20} />
										<span className="text-sm line-clamp-1">{"Has Working Desk"}</span>
									</div>
									<input
										className="hidden"
										type="checkbox"
										{...register("commodities.room.hasWorkingDesk")}
										defaultChecked={data.commodities.room?.hasWorkingDesk}
									/>
								</label>
							</li>
							<li className="flex group cursor-pointer">
								<label
									className={
										"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
									}
								>
									<div className="flex gap-2">
										<HugeiconsIcon icon={Wardrobe01Icon} size={20} />
										<span className="text-sm line-clamp-1">{"Is furnished?"}</span>
									</div>
									<input
										className="hidden"
										type="checkbox"
										{...register("commodities.room.isFurnished")}
										defaultChecked={data.commodities.room?.isFurnished}
									/>
								</label>
							</li>
							<li className="flex group cursor-pointer">
								<label
									className={
										"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
									}
								>
									<div className="flex gap-2">
										<HugeiconsIcon icon={Bathtub01Icon} size={20} />
										<span className="text-sm line-clamp-1">{"Has own Bathroom?"}</span>
									</div>
									<input
										className="hidden"
										type="checkbox"
										{...register("commodities.room.hasPrivateBathroom")}
										defaultChecked={data.commodities.room?.hasPrivateBathroom}
									/>
								</label>
							</li>
						</ul>
					</div>
				</section>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.commodities && (
					<pre className="text-error text-sm p-4 rounded-xl bg-error/10">
						{/* {JSON.stringify(errors.commodities.whole, null, 2)} */}
					</pre>
				)}
				<FormFooterButtons backHref={"/publish/location"} />
			</footer>
		</form>
	);
}
