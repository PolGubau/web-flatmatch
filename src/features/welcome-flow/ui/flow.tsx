import { t } from "i18next";
import { type JSX, useMemo, useState } from "react";
import { Link } from "react-router";
import type { User } from "~/entities/user/user";
import { useUpdateUser } from "~/features/user/model/use-update-user";
import { useUser } from "~/features/user/model/use-user";
import { ChangeBioForm } from "~/features/user/ui/profile/complete-profile/change-bio-form";
import { ChangeGenderForm } from "~/features/user/ui/profile/complete-profile/change-gender-form";
import { Button } from "~/shared/components/ui/button";
import { Logo } from "~/shared/components/ui/logo";
import { StepsName } from "./steps-name";

type Props = {
	userId: User["id"];
};

export const WelcomeFlow = ({ userId }: Props) => {
	const { data } = useUser(userId);
	const { updateUser, isLoading } = useUpdateUser(userId);

	/** Avanza al siguiente paso */
	const [currentStep, setCurrentStep] = useState(0);

	const handleSubmitName = ({
		firstName,
		lastName,
	}: {
		firstName: string;
		lastName: string;
	}) => {
		updateUser({ lastname: lastName, name: firstName });
		next();
	};

	const next = () => setCurrentStep((s) => s + 1);

	/** Steps dinámicos en base al user */
	// biome-ignore lint/correctness/useExhaustiveDependencies: Ignore
	const steps = useMemo(
		() =>
			[
				!data?.name || !data?.lastname
					? {
							form: (
								<StepsName
									defaultFirstName={data?.name}
									defaultLastName={data?.lastname}
									isLoading={isLoading}
									onSubmit={handleSubmitName}
								/>
							),
							id: "name",
						}
					: null,
				!data?.aboutMe
					? {
							form: (
								<ChangeBioForm
									aboutMe={data?.aboutMe ?? ""}
									onSuccess={next}
									userId={userId}
								/>
							),
							id: "bio",
						}
					: null,
				!data?.gender
					? {
							form: (
								<ChangeGenderForm
									gender={data?.gender ?? null}
									onSuccess={next}
									userId={userId}
								/>
							),
							id: "gender",
						}
					: null,
				{
					form: (
						<div className="form px-4 items-center">
							<Logo height={109} width={109} />
							<h3 className="mb-4 text-xl text-center font-semibold text-gray-900 dark:text-white">
								{t("welcome_to_flatmatch")}
							</h3>
							<Button asChild>
								<Link to="/">{t("lets_find_you_a_match")}</Link>
							</Button>
						</div>
					),
					id: "welcome",
				},
			].filter(Boolean) as { id: string; form: JSX.Element }[],
		[data, isLoading],
	);

	const totalSteps = steps.length;
	const activeStep = steps[currentStep];

	if (!activeStep) return null;

	return (
		<div className="animate-fade-in">
			<progress
				className="w-full rounded-xl pb-2"
				max={totalSteps}
				value={currentStep + 1}
			/>
			{activeStep.form}
		</div>
	);
};
