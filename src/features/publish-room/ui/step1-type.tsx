// ui/Step1.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useFormState } from "../model/useFormState";

const schema = z.object({
	age: z.number().min(18),
	name: z.string().min(1),
});

export function Step1() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			age: data.age || 18,
			name: data.name || "",
		},
		resolver: zodResolver(schema),
	});

	return (
		<form
			onSubmit={handleSubmit((values) => {
				setData(values);
				navigate("/publish-form/step2", { replace: true });
			})}
		>
			<input {...register("name")} />
			{errors.name?.message}

			<input type="number" {...register("age", { valueAsNumber: true })} />
			<button type="submit"> Next </button>
		</form>
	);
}
