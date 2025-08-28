import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "~/entities/user/user";
import { UserRepository } from "../infra/repository";

type UseUpdateUserResponse = {
	isLoading: boolean;
	updateUser: (updates: Partial<User>) => void;
	isSuccess: boolean;
	isError: boolean;
};
type UseUpdateUser = (id: User["id"]) => UseUpdateUserResponse;

/**
 * Hook para actualizar un usuario parcialmente.
 * @param id - ID del usuario a actualizar
 */
export const useUpdateUser: UseUpdateUser = (id) => {
	const queryClient = useQueryClient();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: (updates: Partial<User>) => {
			return UserRepository.update(id, updates);
		},
		onError: (err, _updates, context) => {
			console.log(err);
			// Rollback si hay error
			if (context?.previousUser) {
				queryClient.setQueryData(["user", id], context.previousUser);
			}
		},
		onMutate: async (updates: Partial<User>) => {
			// Cancelar queries en curso
			await queryClient.cancelQueries({ queryKey: ["user", id] });

			// Snapshot del estado anterior
			const previousUser = queryClient.getQueryData<User>(["user", id]);

			// Actualización optimista
			if (previousUser) {
				queryClient.setQueryData<User>(["user", id], {
					...previousUser,
					...updates,
				});
			}

			return { previousUser };
		},

		onSuccess: (updatedUser) => {
			console.log("User updated successfully");
			if (updatedUser) {
				// actualiza el cache del usuario individual
				queryClient.setQueryData<User>(["user", id], updatedUser);
				// invalida la lista de usuarios para que se sincronice también
				queryClient.invalidateQueries({ queryKey: ["users"] });
			}
		},
	});

	return {
		isError,
		isLoading: isPending,
		isSuccess,
		updateUser: mutate,
	};
};
