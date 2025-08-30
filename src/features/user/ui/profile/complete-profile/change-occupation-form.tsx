import type React from "react";
import type { User } from "~/entities/user/user";
import { useUpdateUser } from "~/features/user/model/use-update-user";
import { SubmitButton } from "~/shared/components/ui/buttons/submit-button";
import { OccupationField } from "../fields/occupation-field";

type ChangeOccupationFormProps = {
	occupation?: User["occupation"];
	userId: User["id"];
};

export const ChangeOccupationForm = ({ occupation, userId }: ChangeOccupationFormProps) => {
	const { updateUser, isLoading, isSuccess } = useUpdateUser(userId);

	const handleSubmitNewOccupation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newOccupation = e.currentTarget.occupation.value;
		updateUser({ occupation: newOccupation });
		if (isSuccess) {
			e.currentTarget.occupation.value = "";
		}
	};
	return (
		<form className="flex flex-col gap-1" onSubmit={handleSubmitNewOccupation}>
			<OccupationField defaultValue={occupation} />
			<nav className="grid md:grid-cols-[1fr_2fr] gap-2">
				<div />

				<SubmitButton isLoading={isLoading} />
			</nav>
		</form>
	);
};
