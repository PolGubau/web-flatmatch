import { zodResolver } from "@hookform/resolvers/zod";
import {
	FemaleSymbolIcon,
	MaleSymbolIcon,
	UserQuestion01Icon,
} from "@hugeicons/core-free-icons";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { ControlledNumberInput } from "~/shared/components/ui/input/number-input";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

const Step3Schema = EditableRoomSchema.pick({
	whoIsLiving: true,
});
export type Step3SchemaType = z.infer<typeof Step3Schema>;
export function CompanyForm() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();
	const { t } = useTranslation();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Step3SchemaType>({
		defaultValues: { ...data },
		resolver: zodResolver(Step3Schema),
	});

	return (
		<form
			className="grid grid-rows-[1fr_auto] max-h-[85vh] gap-2 h-full"
			onSubmit={handleSubmit(
				(values) => {
					setData(values);
					navigate("/publish/metadata", { replace: true });
				},
				(errors) => {
					console.error(errors);
				},
			)}
		>
			<fieldset className="flex flex-col gap-6 p-1 overflow-y-auto">
				<legend className="text-lg pb-10">{t("who_is_living")}</legend>

				<section className="flex flex-col gap-4">
					<h3>{t("current_tenants")}</h3>
					<ul className="grid gap-4 items-center grid-cols-2 md:grid-cols-3">
						<li>
							<ControlledNumberInput<Step3SchemaType>
								control={control}
								icon={MaleSymbolIcon}
								id="bedrooms-male"
								label="male"
								max={20}
								min={0}
								name="whoIsLiving.currentTenants.male"
								placeholder={t("how_many_male_tenants")}
								required
								rules={{
									max: 20,
									min: 0,
									required: true,
									valueAsNumber: true,
								}}
							/>
						</li>
						<li>
							<ControlledNumberInput<Step3SchemaType>
								control={control}
								icon={FemaleSymbolIcon}
								id="bedrooms-female"
								label="female"
								max={20}
								min={0}
								name="whoIsLiving.currentTenants.female"
								placeholder={t("how_many_female_tenants")}
								rules={{
									max: 20,
									min: 0,
									required: true,
									valueAsNumber: true,
								}}
							/>
						</li>
						<li>
							<ControlledNumberInput<Step3SchemaType>
								control={control}
								icon={UserQuestion01Icon}
								id="bedrooms-other"
								label="non_binary"
								max={20}
								min={0}
								name="whoIsLiving.currentTenants.other"
								placeholder={t("how_many_other_tenants")}
								rules={{
									max: 20,
									min: 0,
									required: true,
									valueAsNumber: true,
								}}
							/>
						</li>
					</ul>
				</section>

				<section>
					<h3>{t("owner")}</h3>
					<div className="flex items-center gap-2">
						<input
							className="peer h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							id="owner-lives-here"
							type="checkbox"
							{...register("whoIsLiving.ownerLivesHere")}
						/>
						<label
							className="text-sm font-medium text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							htmlFor="owner-lives-here"
						>
							{t("does_owner_live_here")}
						</label>
					</div>
				</section>
			</fieldset>

			<footer className="flex flex-col gap-1">
				{errors.whoIsLiving && (
					<p className="text-error text-sm p-4 rounded-xl bg-error/10">
						{JSON.stringify(errors.whoIsLiving.message)}
					</p>
				)}
				<FormFooterButtons backHref={"/publish/commodities"} />
			</footer>
		</form>
	);
}
