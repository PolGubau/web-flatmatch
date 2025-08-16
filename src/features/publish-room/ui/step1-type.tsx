// ui/Step1.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { EditableRoomSchema } from "~/entities/room/editable-room.schema";
import { useFormState } from "../model/useFormState";

export function Step1() {
	const navigate = useNavigate();
	const { data, setData } = useFormState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			//
		},
		resolver: zodResolver(EditableRoomSchema),
	});

	return (
		// <form
		// 	className="flex flex-col gap-3"
		// 	onSubmit={handleSubmit((values) => {
		// 		setData(values);
		// 		navigate("/publish/step2", { replace: true });
		// 	})}
		// >

		// 	<input {...register("name")} className="border p-2" />
		// 	{errors.name?.message}

		// 	<input type="number" {...register("age", { valueAsNumber: true })} className="border p-2" />
		// 	<button className="bg-blue-500 text-white p-2" type="submit">
		// 		Next
		// 	</button>
		// </form>

		<form
			onSubmit={handleSubmit((values) => {
				setData(values);
				navigate("/publish/step2", { replace: true });
			})}
		>
			<ul className="grid grid-cols-2 gap-6 min-h-40 w-full max-w-4xl mx-auto min-w-[300px]">
				<li className="p-4 rounded-2xl bg-foreground/10 flex gap-3 items-center relative">
					<input
						{...register("rentType")}
						className="absolute inset-0 top-0 left-0 w-full h-full opacity-0 peer"
						id="room"
						name="type"
						type="radio"
						value="room"
					/>
					<label className="peer-checked:font-bold" htmlFor="room">
						Room
					</label>
				</li>
				<li className="p-4 rounded-2xl bg-foreground/10 flex gap-3 items-center min-h-40 relative">
					<input
						{...register("rentType")}
						className="absolute inset-0 top-0 left-0 w-full h-full opacity-0 peer"
						id="shared"
						name="type"
						type="radio"
						value="shared"
					/>
					<label className="peer-checked:font-bold" htmlFor="shared">
						Shared
					</label>
				</li>
				<li className="p-4 rounded-2xl bg-foreground/10 flex gap-3 items-center min-h-40 relative">
					<input
						{...register("rentType")}
						className="absolute inset-0 top-0 left-0 w-full h-full opacity-0 peer"
						id="apartment"
						name="type"
						type="radio"
						value="apartment"
					/>
					<label className="peer-checked:font-bold" htmlFor="apartment">
						Apartment
					</label>
				</li>
			</ul>

			<button className="bg-blue-500 text-white p-2" type="submit">
				Next
			</button>
		</form>
	);
}
