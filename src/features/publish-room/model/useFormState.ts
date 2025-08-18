import { create } from "zustand";
import type { EditableRoom } from "~/entities/room/editable-room";
import { emptyEditableRoom } from "~/entities/room/empty-editable-room";

export const useFormState = create<{
	data: EditableRoom;
	setData: (d: Partial<EditableRoom>) => void;
	reset: () => void;
}>((set) => ({
	data: emptyEditableRoom,
	reset: () => set({ data: { ...emptyEditableRoom } }),
	setData: (d) => set((s) => ({ data: { ...s.data, ...d } })),
}));
