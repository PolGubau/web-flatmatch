import { useQuery } from "@tanstack/react-query";
import type { User } from "~/entities/user/user";
import { UserRepository } from "../infra/repository";

export const useUsers = () => {
	return useQuery<User[], Error>({
		queryFn: () => UserRepository.findAll(),
		queryKey: ["users"],
	});
};
