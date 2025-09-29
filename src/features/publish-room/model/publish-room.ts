import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { EditableRoom } from "~/entities/room/editable-room";
import type { Room } from "~/entities/room/room";
import { createRoom } from "~/features/room/infra/room-api";
import { toast } from "~/shared/components/ui/sonner";

export type UsePublishRoomResponse = {
	create: (editableRoom: EditableRoom) => void;
	data: Room | undefined;
	error: null | Error;
	isPending: boolean;
};

export const usePublishRoom = (): UsePublishRoomResponse => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mutationResult = useMutation({
		mutationFn: createRoom,
		onError: (error) => {
			console.error("Error creating room:", error);
			toast.error("There was an error creating the room.");
		},
		onSuccess: (room) => {
			queryClient.invalidateQueries({ queryKey: ["room", room.id] });
			alert("Room created successfully!");
			navigate(`/room/${room.id}`);
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
