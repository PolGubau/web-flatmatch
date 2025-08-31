import type React from "react";
import type { User } from "~/entities/user/user";
import { useUpdateUser } from "~/features/user/model/use-update-user";
import { SubmitButton } from "~/shared/components/ui/buttons/submit-button";
import { GenderField } from "../fields/gender-field";

type ChangeGenderFormProps = {
	gender: User["gender"] | null;
	userId: User["id"];
	onSuccess?: () => void;
};

export const ChangeGenderForm = ({ gender, userId, onSuccess }: ChangeGenderFormProps) => {
	const { updateUser, isLoading, isSuccess } = useUpdateUser(userId);

	const handleSubmitNewGender = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newGender = e.currentTarget.gender.value;
		updateUser({ gender: newGender });
		if (isSuccess) {
			e.currentTarget.gender.value = "";
			onSuccess?.();
		}
	};
	return (
		<form className="flex flex-col gap-1" onSubmit={handleSubmitNewGender}>
			<GenderField defaultValue={gender ?? undefined} />
			<nav className="grid md:grid-cols-[1fr_2fr] gap-2">
				<div />

				<SubmitButton isLoading={isLoading} />
			</nav>
		</form>
	);
};
