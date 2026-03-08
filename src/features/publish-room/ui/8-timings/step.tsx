import { zodResolver } from "@hookform/resolvers/zod";
import {
	Calendar03Icon,
	InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { Input } from "~/shared/components/ui/input/input";
import { cn } from "~/shared/utils/utils";
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
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Step8SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step8Schema),
	});

	const availableFrom = watch("timings.availableFrom");
	const availableUntil = watch("timings.availableUntil");
	const maxStayValue = watch("timings.maximumStay.value");

	// Siempre establecer la unidad como "month"
	useEffect(() => {
		setValue("timings.maximumStay.unit", "month");
		setValue("timings.minimumStay.unit", "month");
	}, [setValue]);

	// Si hay availableUntil, limpiar maximumStay
	useEffect(() => {
		if (availableUntil) {
			setValue("timings.maximumStay.value", undefined);
		}
	}, [availableUntil, setValue]);

	const hasEndDate = !!availableUntil;
	const showMaxStay = !hasEndDate;

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={wrapSubmit(handleSubmit)}
		>
			<fieldset className="flex flex-col gap-6 overflow-y-auto p-1">
				<legend className="text-lg pb-6">
					{t("when_is_room_available", {
						defaultValue: "When is the room available?",
					})}
				</legend>

				{/* Sección de fechas */}
				<div className="space-y-6">
					<div className="space-y-4">
						<h3 className="text-base font-semibold flex items-center gap-2">
							<HugeiconsIcon icon={Calendar03Icon} size={20} />
							{t("availability_period", {
								defaultValue: "Availability period",
							})}
						</h3>

						<div className="grid md:grid-cols-2 gap-4">
							{/* Disponible desde */}
							<div className="space-y-2">
								<DatePicker
									fromDate={new Date()}
									label="available_from"
									mode="single"
									required
									{...register("timings.availableFrom")}
								/>
								<p className="text-xs text-foreground/60">
									{t("when_room_becomes_available", {
										defaultValue: "When does the room become available?",
									})}
								</p>
							</div>

							{/* Disponible hasta */}
							<div className="space-y-2">
								<DatePicker
									hidden={{
										before: availableFrom
											? new Date(availableFrom)
											: new Date(),
									}}
									label="available_until"
									mode="single"
									placeholder="no_end_date"
									{...register("timings.availableUntil")}
								/>
								<p className="text-xs text-foreground/60">
									{t("leave_empty_indefinite", {
										defaultValue: "Leave empty if available indefinitely",
									})}
								</p>
							</div>
						</div>
					</div>

					{/* Periodo máximo de estancia - Solo si NO hay fecha de fin */}
					{showMaxStay && (
						<div
							className={cn(
								"space-y-4 p-4 rounded-lg border-2 border-dashed transition-all",
								maxStayValue
									? "border-primary/40 bg-primary/5"
									: "border-foreground/20 bg-foreground/5",
							)}
						>
							<div className="space-y-2">
								<h3 className="text-base font-semibold">
									{t("maximum_stay_period", {
										defaultValue: "Maximum stay period",
									})}
								</h3>
								<p className="text-sm text-foreground/70">
									{t("max_stay_description", {
										defaultValue:
											"How long can a tenant stay? Leave empty for no limit.",
									})}
								</p>
							</div>

							<div className="flex items-end gap-3">
								<div className="flex-1 max-w-xs">
									<Input
										label="months"
										min={1}
										placeholder={t("no_maximum", { defaultValue: "No limit" })}
										type="number"
										{...register("timings.maximumStay.value", {
											valueAsNumber: true,
										})}
									/>
								</div>
								<div className="text-sm text-foreground/60 pb-3">
									{t("months_unit", { defaultValue: "month(s)" })}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Información visual */}
				<div className="space-y-3 mt-2">
					{availableFrom && (
						<div className="flex items-start gap-3 p-3 bg-info/10 rounded-lg">
							<HugeiconsIcon
								className="text-info mt-0.5 flex-shrink-0"
								icon={InformationCircleIcon}
								size={20}
							/>
							<div className="space-y-1 text-sm">
								<p className="font-medium">
									{hasEndDate
										? t("room_available_from_to", {
												defaultValue: "Room available from {{from}} to {{to}}",
												from: new Date(availableFrom).toLocaleDateString(),
												to: availableUntil
													? new Date(availableUntil).toLocaleDateString()
													: "",
											})
										: t("room_available_from", {
												defaultValue: "Room available from {{from}}",
												from: new Date(availableFrom).toLocaleDateString(),
											})}
								</p>
								{showMaxStay && maxStayValue && (
									<p className="text-foreground/70">
										{t("max_stay_info", {
											count: maxStayValue,
											defaultValue: "Tenants can stay up to {{count}} month(s)",
										})}
									</p>
								)}
								{hasEndDate && (
									<p className="text-foreground/70">
										{t("fixed_period_info", {
											defaultValue:
												"This is a fixed period - tenants must leave by the end date",
										})}
									</p>
								)}
							</div>
						</div>
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
