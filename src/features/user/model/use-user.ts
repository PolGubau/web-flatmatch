import { useQuery } from "@tanstack/react-query";
import type { User } from "~/entities/user/user";
import { UserRepository } from "../infra/repository";

/**
 * Fetch one user by ID
 */
export const useUser = (id: string) => {
	return useQuery<User | null, Error>({
		enabled: !!id,
		queryFn: () => UserRepository.findById(id),
		queryKey: ["user", id],
	});
};
