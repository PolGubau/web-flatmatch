import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { Input } from "~/shared/components/ui/input";
import { useFormState } from "../../model/useFormState";
import { FormFooterButtons } from "../shared/form-footer-buttons";

const Step3Schema = EditableRoomSchema.pick({
	whoIsLiving: true,
});
export type Step3SchemaType = z.infer<typeof Step3Schema>;
export function CompanyForm() {
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
				<legend className="text-lg pb-10">Who is living there?</legend>

				<section className="flex flex-col gap-4">
					<h3>Current Tenants</h3>
					<ul className="grid gap-4 items-center grid-cols-2 md:grid-cols-3">
						<li>
							<Input
								id="bedrooms-male"
								// icon={BedIcon}
								label="Male"
								max={10}
								min={0}
								placeholder="How many male tenants?"
								type="number"
								{...register("whoIsLiving.currentTenants.male", {
									required: true,
									valueAsNumber: true,
								})}
							/>
						</li>
						<li>
							<Input
								// icon={BedBunkIcon}
								id="bedrooms-female"
								label="Female"
								max={20}
								min={0}
								placeholder="How many female tenants?"
								type="number"
								{...register("whoIsLiving.currentTenants.female", {
									required: true,
									valueAsNumber: true,
								})}
							/>
						</li>
						<li>
							<Input
								// icon={BedBunkIcon}
								id="bedrooms-other"
								label="Other"
								max={20}
								min={0}
								placeholder="How many other tenants?"
								type="number"
								{...register("whoIsLiving.currentTenants.other", {
									required: true,
									valueAsNumber: true,
								})}
							/>
						</li>
					</ul>
				</section>

				<section>
					<h3>Owner</h3>
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
							Does the owner live here?
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
				<FormFooterButtons backHref={"/publish/location"} />
			</footer>
		</form>
	);
}
