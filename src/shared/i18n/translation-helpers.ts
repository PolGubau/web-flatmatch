import { t } from "i18next";
import type { TranslationKey } from "./i18n";

/**
 * Helper type-safe para traducciones
 * Evita el uso de 'as any' y proporciona autocompletado
 */
export const ts = (
	key: TranslationKey,
	options?: Record<string, unknown>,
): string => {
	return t(key, options);
};

/**
 * Helper para traducciones con valores interpolados
 */
export const tsWithValues = (
	key: TranslationKey,
	values: Record<string, string | number>,
): string => {
	return t(key, values);
};

/**
 * Helper para traducciones plurales
 */
export const tsPlural = (
	key: TranslationKey,
	count: number,
	options?: Record<string, unknown>,
): string => {
	return t(key, { ...options, count });
};
