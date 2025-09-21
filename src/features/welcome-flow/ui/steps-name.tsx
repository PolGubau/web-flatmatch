import { SubmitButton } from "~/shared/components/ui/buttons/submit-button";
import { Input } from "~/shared/components/ui/input/input";

type StepsNameProps = {
	onSubmit: (data: { firstName: string; lastName: string }) => void;
	isLoading: boolean;
	defaultFirstName?: string;
	defaultLastName?: string;
};
export const StepsName = ({
	onSubmit,
	defaultFirstName,
	defaultLastName,
	isLoading,
}: StepsNameProps) => {
	return (
		<form
			className="form"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const firstName = formData.get("firstName") as string;
				const lastName = formData.get("lastName") as string;
				onSubmit({ firstName, lastName });
			}}
		>
			<Input
				defaultValue={defaultFirstName}
				label="first_name"
				name="firstName"
				placeholder="John"
				readOnly={isLoading}
			/>
			<Input
				defaultValue={defaultLastName}
				label="last_name"
				name="lastName"
				placeholder="Doe"
				readOnly={isLoading}
			/>
			<SubmitButton isLoading={isLoading} />
		</form>
	);
};
