import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EditableRoom } from "~/entities/room/editable-room";
import { emptyEditableRoom } from "~/entities/room/empty-editable-room";

export const useFormState = create<{
	data: EditableRoom;
	setData: (d: Partial<EditableRoom>) => void;
	reset: () => void;
}>()(
	persist(
		(set) => ({
			data: emptyEditableRoom,
			reset: () => set({ data: { ...emptyEditableRoom } }),
			setData: (d) => set((s) => ({ data: { ...s.data, ...d } })),
		}),
		{
			name: "flatmatch-publish-room-form",
			// Solo persistir data, no las funciones
			partialize: (state) => ({ data: state.data }),
		},
	),
);
