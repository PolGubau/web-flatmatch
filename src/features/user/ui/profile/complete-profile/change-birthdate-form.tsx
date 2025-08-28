import type React from "react";
import { useTranslation } from "react-i18next";
import type { User } from "~/entities/user/user";
import { useUpdateUser } from "~/features/user/model/use-update-user";
import { Button } from "~/shared/components/ui/button";
import { SubmitButton } from "~/shared/components/ui/buttons/submit-button";
import { Loader } from "~/shared/components/ui/loader";
import { BirthdateField } from "../fields/birthdate-field";

type ChangeBirthdateFormProps = {
	birthDate?: User["birthDate"];
	userId: User["id"];
};

export const ChangeBirthdateForm = ({ birthDate, userId }: ChangeBirthdateFormProps) => {
	const { updateUser, isLoading, isSuccess } = useUpdateUser(userId);
	const { t } = useTranslation();

	const handleSubmitNewBirthdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newBirthdate = e.currentTarget.occupation.value;
		updateUser({ birthDate: newBirthdate });
		if (isSuccess) {
			e.currentTarget.birthDate.value = "";
		}
	};
	return (
		<form className="flex flex-col gap-1" onSubmit={handleSubmitNewBirthdate}>
			<BirthdateField defaultValue={birthDate?.toISOString().split("T")[0]} />
			
			<nav className="grid md:grid-cols-[1fr_2fr] gap-2">
				<div />
				<SubmitButton isLoading={isLoading} />
			</nav>
		</form>
	);
};
