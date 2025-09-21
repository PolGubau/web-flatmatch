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
import { type FieldPath, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { commoditiesMap, extrasMap } from "~/shared/base/maps";
import { Input } from "~/shared/components/ui/input/input";
import { Select } from "~/shared/components/ui/select";
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

	const { t } = useTranslation();
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
				<legend className="text-lg pb-6">{t("select_commodities")}</legend>
				<header className="grid gap-4 items-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
					<Input
						icon={SquareArrowExpand01Icon}
						id="area"
						label={"enter_area_in_m2"}
						max={999}
						min={1}
						placeholder={t("enter_area_in_m2")}
						required
						{...register("commodities.whole.area", {
							required: true,
							valueAsNumber: true,
						})}
					/>

					<Input
						icon={Sink01Icon}
						id="bathrooms"
						label={"bathrooms"}
						max={10}
						min={0}
						placeholder={t("enter_number_bathrooms")}
						required
						type="number"
						{...register("commodities.whole.bathrooms", {
							required: true,
							valueAsNumber: true,
						})}
					/>

					<Input
						icon={BedIcon}
						id="bedrooms-ind"
						label={"bedrooms"}
						max={10}
						min={0}
						placeholder={t("enter_amount_private_bedrooms")}
						required
						{...register("commodities.whole.bedrooms.individual", {
							required: true,
							valueAsNumber: true,
						})}
					/>

					<Input
						icon={BedBunkIcon}
						id="bedrooms-shared"
						label={"shared"}
						max={999}
						min={0}
						placeholder={t("enter_amount_shared_bedrooms")}
						required
						type="number"
						{...register("commodities.whole.bedrooms.shared", {
							required: true,
							valueAsNumber: true,
						})}
					/>
				</header>
				<div className="flex flex-col gap-1">
					<h3>{t("apartment_appliances")}</h3>
					<ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
						{Object.entries(data.commodities.whole.appliances).map(([key, value]) => {
							const field = register(
								`commodities.whole.appliances.${key}` as FieldPath<Step3SchemaType>,
							);
							const data = commoditiesMap[key as keyof typeof commoditiesMap];
							return (
								<li className="flex group cursor-pointer" key={key}>
									<label
										className={
											"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
										}
									>
										<div className="flex gap-2">
											{data.icon && <HugeiconsIcon icon={data.icon} size={20} />}{" "}
											<span className="text-sm line-clamp-1">{t(data.label)}</span>
										</div>
										<input className="hidden" type="checkbox" {...field} defaultChecked={value} />
									</label>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="flex flex-col gap-1">
					<h3>{t("extra_spaces")}</h3>
					<ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
						{Object.entries(data.commodities.whole.extras).map(([key, value]) => {
							const field = register(
								`commodities.whole.extras.${key}` as FieldPath<Step3SchemaType>,
							);
							const data = extrasMap[key as keyof typeof extrasMap];
							return (
								<li className="flex group cursor-pointer" key={key}>
									<label
										className={
											"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
										}
									>
										<div className="flex gap-2">
											{data.icon && <HugeiconsIcon icon={data.icon} size={20} />}
											<span className="text-sm">{t(data.label)}</span>
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
						<span className="">{t("are_utilities_included")}?</span>
					</label>
				</div>

				<section className="border-t border-foreground/10 pt-4">
					<div className="flex flex-col gap-8">
						<h3>{t("room_appliances")}</h3>

						<header className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
							<Input
								icon={SquareArrowExpand01Icon}
								id="area"
								label={"enter_area_in_m2"}
								max={999}
								min={1}
								placeholder={t("enter_area_in_m2")}
								{...register("commodities.room.area", {
									required: true,
									valueAsNumber: true,
								})}
							/>

							<Select
								{...register("commodities.room.bedType")}
								label={t("bed_type")}
								options={[
									{ label: "single", value: "single" },
									{ label: "double", value: "double" },
									{ label: "bunk", value: "bunk" },
									{ label: "sofa", value: "sofa" },
									{ label: "none", value: "none" },
								]}
								placeholder={"select_bed_type"}
							/>
						</header>
						<ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
							<li className="flex group cursor-pointer">
								<label
									className={
										"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
									}
								>
									<div className="flex gap-2">
										<HugeiconsIcon icon={PatioIcon} size={20} />
										<span className="text-sm line-clamp-1">{t("has_balcony")}</span>
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
										<span className="text-sm line-clamp-1">{t("has_window")}</span>
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
										<span className="text-sm line-clamp-1">{t("has_working_desk")}</span>
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
										<span className="text-sm line-clamp-1">{t("is_furnished")}</span>
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
										<span className="text-sm line-clamp-1">{t("has_private_bathroom")}</span>
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
						{JSON.stringify(errors.commodities.room?.area?.message, null, 2)}
					</pre>
				)}
				<FormFooterButtons backHref={"/publish/location"} />
			</footer>
		</form>
	);
}
