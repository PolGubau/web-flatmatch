import { useFormState } from "../../model/useFormState";

export const RoomPreview = () => {
	const { data } = useFormState();

	return (
		<div>
			<h1>Preview</h1>
			{JSON.stringify(data, null, 2)}
		</div>
	);
};
