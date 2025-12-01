import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { t } from "i18next";
import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
	type RegisterOptions,
} from "react-hook-form";
import type { TranslationKey } from "~/shared/i18n/i18n";
import type { Breakpoints } from "~/shared/types/common";
import { cn } from "~/shared/utils/utils";
import { Button } from "../button";
import { inputTheme } from "./theme";

type NumberInputProps = Omit<
	React.ComponentProps<"input">,
	"size" | "type" | "onChange"
> & {
	icon?: IconSvgElement;
	label?: TranslationKey;
	size?: Breakpoints;
	onValueChange?: (value: number) => void;
	step?: number;
};

/**
 * Numeric input with increment/decrement buttons
 */
export function NumberInput({
	className,
	icon,
	label,
	size = "md",
	onValueChange,
	value,
	defaultValue, step = 1,
	id,
	...props
}: NumberInputProps) {
	const [internalValue, setInternalValue] = useState<number>(
		value !== undefined
			? Number(value)
			: defaultValue !== undefined
				? Number(defaultValue)
				: 0,
	);

	// Sync internal value when "value" changes externally
	useEffect(() => {
		if (value !== undefined) setInternalValue(Number(value));
	}, [value]);

	const update = useCallback(
		(val: number) => {
			const sanitized = Number.isNaN(val) ? 0 : val;
			setInternalValue(sanitized);
			onValueChange?.(sanitized);
		},
		[onValueChange],
	);

	const onInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			update(Number(e.target.value));
		},
		[update],
	);

	const addOne = useCallback(() => {
		const newValue = internalValue + step;
		// add one if that does not exceed max
		if (props.max === undefined || newValue <= Number(props.max)) {
			update(newValue);
		}
	}, [internalValue, update, props.max, step]);
	const subtractOne = useCallback(() => {
		const newValue = internalValue - step;
		// subtract one if that does not go below min
		if (props.min === undefined || newValue >= Number(props.min)) {
			update(newValue);
		}
	}, [internalValue, update, props.min, step]);

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="flex gap-2" htmlFor={id}>
					<span className="text-sm">{t(label)}</span>
				</label>
			)}

			<div className="relative">
				{icon && (
					<HugeiconsIcon
						className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60"
						icon={icon}
						size={22}
					/>
				)}

				<input
					className={cn(inputTheme, { "pl-10": !!icon }, className)}
					data-size={size}
					data-slot="input"
					id={id}
					onChange={onInputChange}
					type="number"
					value={internalValue}
					{...props}
				/>

				<div className="flex gap-1 absolute right-2 top-1/2 -translate-y-1/2">
					<Button
						disabled={
							props.min !== undefined && internalValue <= Number(props.min)
						}
						onClick={subtractOne}
						size="icon"
						type="button"
						variant="ghost"
					>
						<Minus size={18} />
					</Button>
					<Button
						disabled={
							props.max !== undefined && internalValue >= Number(props.max)
						}
						onClick={addOne}
						size="icon"
						type="button"
						variant="ghost"
					>
						<Plus size={18} />
					</Button>
				</div>
			</div>
		</div>
	);
}

type ControlledNumberInputProps<TForm extends FieldValues = FieldValues> = {
	control: Control<TForm>;
	name: FieldPath<TForm>;
	label?: TranslationKey;
	rules?: RegisterOptions<TForm>;
} & Omit<NumberInputProps, "value" | "onValueChange" | "defaultValue">;

/**
 * RHF wrapper for NumberInput
 */
export function ControlledNumberInput<TForm extends FieldValues = FieldValues>({
	control,
	name,
	label,
	rules,
	...props
}: ControlledNumberInputProps<TForm>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<NumberInput
					label={label}
					{...props}
					onValueChange={field.onChange}
					value={field.value}
				/>
			)}
			rules={rules}
		/>
	);
}
