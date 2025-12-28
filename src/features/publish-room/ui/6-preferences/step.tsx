import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { type FieldPath, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { genderMap, occupationMap } from "~/shared/base/maps";
import { Input } from "~/shared/components/ui/input/input";
import type { Gender } from "~/shared/types/common";
import { useFormNavigation } from "../../model/use-form-navigation";
import { useFormState } from "../../model/useFormState";
import { ErrorMessage } from "../shared/error-message";
import { FormFooterButtons } from "../shared/form-footer-buttons";

export const Step6Schema = EditableRoomSchema.pick({
	preferences: true,
});
export type Step6SchemaType = z.infer<typeof Step6Schema>;
export function PreferencesForm() {
	const { data } = useFormState();
	const { wrapSubmit } = useFormNavigation<Step6SchemaType>({
		nextStep: "/publish/rules",
	});
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step6SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step6Schema),
	});

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={wrapSubmit(handleSubmit)}
		>
			<fieldset className="flex flex-col gap-6 overflow-y-auto">
				<legend className="text-lg pb-10">
					{t("who_are_you_searching_for")}
				</legend>

				<section className="flex flex-col gap-4">
					<h3 className="">{t("age_preference")}</h3>

					<ul className="grid grid-cols-2 gap-4 max-w-sm">
						<li>
							<Input
								defaultValue={data.preferences.age.min}
								id="min-age"
								label="min_age"
								type="number"
								{...register("preferences.age.min", { valueAsNumber: true })}
							/>
						</li>
						<li>
							<Input
								defaultValue={data.preferences.age.max}
								id="max-age"
								label="max_age"
								type="number"
								{...register("preferences.age.max", { valueAsNumber: true })}
							/>
						</li>
					</ul>
				</section>

				<div className="flex flex-col gap-1">
					<h3>{t("occupation_of_tenant")}</h3>
					<ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
						{Object.entries(data.preferences.currentOccupation).map(
							([key, value]) => {
								const field = register(
									`preferences.currentOccupation.${key}` as FieldPath<Step6SchemaType>,
								);
								const data = occupationMap[key];
								return (
									<li className="flex group cursor-pointer" key={key}>
										<label
											className={
												"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
											}
										>
											<div className="flex gap-2">
												{data?.icon && (
													<HugeiconsIcon icon={data?.icon} size={20} />
												)}{" "}
												<span className="text-sm">
													{t(data?.label ?? "unknown")}
												</span>
											</div>
											<input
												className="hidden"
												type="checkbox"
												{...field}
												defaultChecked={value}
											/>
										</label>
									</li>
								);
							},
						)}
					</ul>
				</div>
				<div className="flex flex-col gap-1">
					<h3>{t("gender_of_tenant")}</h3>
					<ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
						{Object.entries(data.preferences.gender).map(([key, value]) => {
							const gender: Gender = key as Gender;
							// biome-ignore lint/suspicious/noExplicitAny: Can be needed
							const field = register(`preferences.gender.${key}` as any);
							const data = genderMap[gender];
							return (
								<li className="flex group cursor-pointer" key={key}>
									<label
										className={
											"has-checked:bg-primary/20 has-checked:hover:bg-primary/10 bg-secondary/5 hover:bg-foreground/10 transition-all p-4 w-full h-full rounded-xl gap-4"
										}
									>
										<div className="flex gap-2">
											{data?.icon && (
												<HugeiconsIcon icon={data?.icon} size={20} />
											)}
											<span className="text-sm">
												{t(data?.label ?? "unknown")}
											</span>
										</div>
										<input
											className="hidden"
											type="checkbox"
											{...field}
											defaultChecked={value}
										/>
									</label>
								</li>
							);
						})}
					</ul>
				</div>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{/* biome-ignore lint/suspicious/noExplicitAny: react-hook-form complex type */}
				<ErrorMessage error={errors.preferences as any} />
				<FormFooterButtons backHref={"/publish/metadata"} />
			</footer>
		</form>
	);
}
