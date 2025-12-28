import { zodResolver } from "@hookform/resolvers/zod";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
	EditableRoomSchema,
	stayUnits,
} from "~/entities/room/editable-room.schema";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { Input } from "~/shared/components/ui/input/input";
import { RHFSelect } from "~/shared/components/ui/select";
import { useFormNavigation } from "../../model/use-form-navigation";
import { useFormState } from "../../model/useFormState";
import { ErrorMessage } from "../shared/error-message";
import { FormFooterButtons } from "../shared/form-footer-buttons";

export const Step8Schema = EditableRoomSchema.pick({
	timings: true,
});
export type Step8SchemaType = z.infer<typeof Step8Schema>;
export function TimingsForm() {
	const { data } = useFormState();
	const { wrapSubmit } = useFormNavigation<Step8SchemaType>({
		nextStep: "/publish/preview",
	});

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Step8SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step8Schema),
	});

	const minStay = watch("timings.minimumStay");
	const maxStay = watch("timings.maximumStay");

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={wrapSubmit(handleSubmit)}
		>
			<fieldset className="flex flex-col gap-6 overflow-y-auto">
				<legend className="text-lg pb-10">What are you searching?</legend>

				<section className="grid md:grid-cols-2 gap-4">
					<DatePicker
						label="available_from"
						mode="single"
						required
						{...register("timings.availableFrom")}
					/>
					<DatePicker
						label="available_until"
						mode="single"
						{...register("timings.availableUntil")}
					/>
				</section>

				<section className="">
					<h3>{t("timings_periods_description")}</h3>

					<div className="grid md:grid-cols-2 gap-4 mt-4">
						<Input
							defaultValue={data.timings.minimumStay?.value}
							label="minimum_stay"
							type="number"
							{...register("timings.minimumStay.value", {
								valueAsNumber: true,
							})}
						/>
						<RHFSelect
							control={control}
							defaultValue={data.timings.minimumStay?.unit}
							label="unit"
							name="timings.minimumStay.unit"
							options={stayUnits.map((u) => ({ label: u, value: u }))}
							placeholder="select_option"
						/>
					</div>
					<div className="grid md:grid-cols-2 gap-4 mt-4 items-end">
						<Input
							defaultValue={data.timings.maximumStay?.value}
							label="maximum_stay"
							placeholder={t("no_maximum")}
							type="number"
							{...register("timings.maximumStay.value", {
								valueAsNumber: true,
							})}
						/>
						<RHFSelect
							control={control}
							defaultValue={data.timings.maximumStay?.unit ?? "month"}
							label="unit"
							name="timings.maximumStay.unit"
							options={stayUnits.map((unit) => ({
								label: unit,
								value: unit,
							}))}
						/>
					</div>
				</section>

				<div className="flex flex-col mt-4 gap-2">
					{minStay?.value && (
						<p className="flex items-center gap-2 p-2 h-12 px-4 bg-info/10 rounded-xl w-fit">
							<HugeiconsIcon icon={InformationCircleIcon} size={20} />
							{t("tenant_must_stay_more_x_y", {
								count: minStay.value,
								unit: minStay.unit,
							})}
						</p>
					)}
					{maxStay?.value && maxStay?.unit && (
						<p className="flex items-center gap-2 p-2 h-12 px-4 bg-info/10 rounded-xl w-fit">
							<HugeiconsIcon icon={InformationCircleIcon} size={20} />
							{t("tenant_must_stay_less_x_y", {
								count: maxStay.value,
								unit: maxStay.unit,
							})}
						</p>
					)}
				</div>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{/* biome-ignore lint/suspicious/noExplicitAny: react-hook-form complex type */}
				<ErrorMessage error={errors.timings as any} />
				<FormFooterButtons backHref={"/publish/rules"} />
			</footer>
		</form>
	);
}
