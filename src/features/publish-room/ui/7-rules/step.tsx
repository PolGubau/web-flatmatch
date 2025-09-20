import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { boolRulesMap } from "~/shared/base/maps";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

export const Step7Schema = EditableRoomSchema.pick({
	rules: true,
});
export type Step7SchemaType = z.infer<typeof Step7Schema>;
export function RulesForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step7SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step7Schema),
	});
	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={handleSubmit(
				(values) => {
					setData(values);
					navigate("/publish/timings", { replace: true });
				},
				(errors) => {
					console.error(errors);
				},
			)}
		>
			<fieldset className="flex flex-col gap-6 overflow-y-auto">
				<legend className="text-lg pb-10">{t("which_are_rules_of_property")}</legend>

				<div className="flex flex-col gap-1">
					<h3>{t("which_of_these_are_possible")}</h3>
					<ul className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
						{Object.entries(data.rules).map(([key, value]) => {
							// biome-ignore lint/suspicious/noExplicitAny: use them as map
							const field = register(`rules.${key}` as any);
							const data = boolRulesMap[key as keyof typeof boolRulesMap];
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
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.rules && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">{JSON.stringify(errors)}</p>
				)}
				<FormFooterButtons backHref={"/publish/company"} />
			</footer>
		</form>
	);
}
