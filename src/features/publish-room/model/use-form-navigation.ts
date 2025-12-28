import { useCallback } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";
import { useNavigate } from "react-router";
import type { EditableRoom } from "~/entities/room/editable-room";
import { useFormState } from "./useFormState";

type UseFormNavigationOptions = {
	nextStep: string;
	onError?: (errors: unknown) => void;
};

/**
 * Hook para manejar la navegación entre pasos del formulario de publicación
 * Centraliza la lógica de guardar datos y navegar
 */
export const useFormNavigation = <T extends Partial<EditableRoom>>({
	nextStep,
	onError,
}: UseFormNavigationOptions) => {
	const navigate = useNavigate();
	const { setData } = useFormState();

	const onSubmit = useCallback(
		(values: T) => {
			setData(values);
			navigate(nextStep, { replace: true });
		},
		[nextStep, navigate, setData],
	);

	const onErrorCallback = useCallback(
		(errors: unknown) => {
			console.error("Form validation errors:", errors);
			onError?.(errors);
		},
		[onError],
	);

	/**
	 * Wrapper para react-hook-form handleSubmit
	 * Simplifica el código en cada step
	 */
	const wrapSubmit = useCallback(
		(handleSubmit: UseFormHandleSubmit<T>) => {
			return handleSubmit(onSubmit, onErrorCallback);
		},
		[onSubmit, onErrorCallback],
	);

	return {
		onErrorCallback,
		onSubmit,
		wrapSubmit,
	};
};
