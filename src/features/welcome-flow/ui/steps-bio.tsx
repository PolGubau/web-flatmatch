import { SubmitButton } from "~/shared/components/ui/buttons/submit-button";

type StepsNameProps = {
	onSubmit: (data: { firstName: string; lastName: string }) => void;
	isLoading: boolean;
};
export const StepsName = ({ onSubmit, isLoading }: StepsNameProps) => {
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
			<SubmitButton isLoading={isLoading} />
		</form>
	);
};
