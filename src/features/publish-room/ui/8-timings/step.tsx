import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { DatePicker } from "~/shared/components/ui/date-picker";
import { Input } from "~/shared/components/ui/input/input";
import { Select } from "~/shared/components/ui/select";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

export const Step8Schema = EditableRoomSchema.pick({
	timings: true,
});
export type Step8SchemaType = z.infer<typeof Step8Schema>;
export function TimingsForm() {
	const _navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step8SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step8Schema),
	});

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
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

				<section>
					<h3>{t("timings_periods_description")}</h3>

					<div className="grid md:grid-cols-2 gap-4 max-w-lg mt-4">
						<Input
							label="maximum_stay"
							type="number"
							{...register("timings.maximumStay.value", { valueAsNumber: true })}
						/>
						<Select
							label="unit"
							options={[
								{ label: "days", value: "days" },
								{ label: "weeks", value: "weeks" },
								{ label: "months", value: "months" },
							]}
							{...register("timings.maximumStay.unit")}
						/>
					</div>
					<div>
						<Input
							label="minimum_stay"
							type="number"
							{...register("timings.minimumStay.value", { valueAsNumber: true })}
						/>
						<Select
							label="unit"
							options={[
								{ label: "days", value: "days" },
								{ label: "weeks", value: "weeks" },
								{ label: "months", value: "months" },
							]}
							{...register("timings.minimumStay.unit")}
						/>
					</div>
				</section>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.timings && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">{JSON.stringify(errors)}</p>
				)}
				<FormFooterButtons backHref={"/publish/company"} />
			</footer>
		</form>
	);
}
