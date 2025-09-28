import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "react-router";
import type { EditableRoom } from "~/entities/room/editable-room";
import type { RoomWithMetadata } from "~/entities/room/room";
import { createRoom } from "~/features/room/infra/room-api";
import { toast } from "~/shared/components/ui/sonner";

export type UsePublishRoomResponse = {
	create: (editableRoom: EditableRoom) => void;
	data: RoomWithMetadata | undefined;
	error: null | Error;
	isPending: boolean;
};

export const usePublishRoom = (): UsePublishRoomResponse => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: createRoom,
		onError: (error) => {
			console.error("Error creating room:", error);
			toast.error("There was an error creating the room.");
		},
		onSuccess: (_, id) => {
			// Invalida la cache de la room eliminada
			queryClient.invalidateQueries({ queryKey: ["room", id] });
			redirect(`/room/${id}`);
			// Invalida lista de rooms si existe
			// queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});
	const { mutateAsync: create, isPending, error, data } = mutationResult;

	return {
		create,
		data,
		error,
		isPending,
	};
};
