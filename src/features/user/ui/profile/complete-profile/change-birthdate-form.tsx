import type React from "react";
import type { User } from "~/entities/user/user";
import { useUpdateUser } from "~/features/user/model/use-update-user";
import { SubmitButton } from "~/shared/components/ui/buttons/submit-button";
import { BirthdateField } from "../fields/birthdate-field";

type ChangeBirthdateFormProps = {
	birthDate?: User["birthDate"];
	userId: User["id"];
};

export const ChangeBirthdateForm = ({
	birthDate,
	userId,
}: ChangeBirthdateFormProps) => {
	const { updateUser, isLoading, isSuccess } = useUpdateUser(userId);

	const handleSubmitNewBirthdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newBirthdate = e.currentTarget.birthDate.value;
		if (newBirthdate && newBirthdate !== birthDate) {
			updateUser({ birthDate: newBirthdate });
		}
		if (isSuccess) {
			e.currentTarget.birthDate.value = "";
		}
	};
	return (
		<form className="flex flex-col gap-1" onSubmit={handleSubmitNewBirthdate}>
			<BirthdateField defaultValue={birthDate} />

			<nav className="grid md:grid-cols-[1fr_2fr] gap-2">
				<div />
				<SubmitButton isLoading={isLoading} />
			</nav>
		</form>
	);
};
