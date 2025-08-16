import { create } from "zustand";
import type { EditableRoom } from "~/entities/room/editable-room";

export const useFormState = create<{
	data: Partial<EditableRoom>;
	setData: (d: Partial<EditableRoom>) => void;
	reset: () => void;
}>((set) => ({
	data: {},
	reset: () => set({ data: {} }),
	setData: (d) => set((s) => ({ data: { ...s.data, ...d } })),
}));
