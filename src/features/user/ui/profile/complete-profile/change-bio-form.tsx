import type React from "react";
import { useUpdateUser } from "~/features/user/model/use-update-user";
import { SubmitButton } from "~/shared/components/ui/buttons/submit-button";
import { BioField } from "../fields/bio-field";

type AddNewBioProps = {
	aboutMe?: string;
	userId: string;
	onSuccess?: () => void;
};

export const ChangeBioForm = ({
	aboutMe,
	userId,
	onSuccess,
}: AddNewBioProps) => {
	const { updateUser, isLoading, isSuccess } = useUpdateUser(userId);
	const handleSubmitNewBio = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newBio = e.currentTarget.aboutMe.value;
		updateUser({ aboutMe: newBio });
		if (isSuccess) {
			e.currentTarget.aboutMe.value = "";
			onSuccess?.();
		}
	};
	return (
		<form className="flex flex-col gap-1" onSubmit={handleSubmitNewBio}>
			<BioField defaultValue={aboutMe} />
			<nav className="grid md:grid-cols-[1fr_2fr] gap-2">
				<div />

				<SubmitButton isLoading={isLoading} />
			</nav>
		</form>
	);
};
