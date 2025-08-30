import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "~/entities/user/user";
import { UserRepository } from "../infra/repository";

type UseUpdateUserResponse = {
	updateUser: (updates: Partial<User>) => void;
	isLoading: boolean;
	isSuccess: boolean;
};
type UpdateContext = {
	previousUser?: User;
	previousUsers?: User[];
};

/**
 * Hook para actualizar un usuario con actualización optimista
 */
export const useUpdateUser = (id: User["id"]): UseUpdateUserResponse => {
	const queryClient = useQueryClient();

	const {
		mutate: updateUser,
		isPending,
		isSuccess,
	} = useMutation<User, Error, Partial<User>, UpdateContext>({
		mutationFn: (updates): Promise<User> => UserRepository.update(id, updates),

		onError: (err, _updates, context) => {
			console.error(err);
			if (context?.previousUser) {
				queryClient.setQueryData(["user", id], context.previousUser);
			}
			if (context?.previousUsers) {
				queryClient.setQueryData(["users"], context.previousUsers);
			}
		},

		onMutate: async (updates) => {
			await queryClient.cancelQueries({ queryKey: ["user", id] });

			const previousUser = queryClient.getQueryData<User>(["user", id]);
			const previousUsers = queryClient.getQueryData<User[]>(["users"]);

			// Update optimista del user individual
			if (previousUser) {
				queryClient.setQueryData<User>(["user", id], {
					...previousUser,
					...updates,
				});
			}

			// Update optimista de la lista
			if (previousUsers) {
				queryClient.setQueryData<User[]>(["users"], (old) =>
					old?.map((u) => (u.id === id ? { ...u, ...updates } : u)),
				);
			}

			return { previousUser, previousUsers };
		},

		onSuccess: (updatedUser) => {
			queryClient.setQueryData<User>(["user", id], updatedUser);
			queryClient.setQueryData<User[]>(["users"], (old) =>
				old?.map((u) => (u.id === id ? updatedUser : u)),
			);
		},
	});

	return {
		isLoading: isPending,
		isSuccess,
		updateUser,
	};
};
