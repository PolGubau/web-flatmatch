import { create } from 'zustand'

export type FormData = {
  name: string
  age: number
  university: string
  budget: number
}

export const useFormState = create<{
  data: Partial<FormData>
  setData: (d: Partial<FormData>) => void
  reset: () => void
}>(set => ({
  data: {},
  setData: d => set(s => ({ data: { ...s.data, ...d } })),
  reset: () => set({ data: {} }),
}))
