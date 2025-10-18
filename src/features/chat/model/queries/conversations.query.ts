import { useQuery } from "@tanstack/react-query";
import { conversationService } from "../services/chat.service";

export const useConversationsQuery = () => {
	return useQuery({
		queryFn: () => conversationService.getAll(),
		queryKey: ["conversations"],
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60, // 1 minuto
	});
};
