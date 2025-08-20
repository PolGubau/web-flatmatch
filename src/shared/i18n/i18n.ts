import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
export const defaultNS = "ns1";

export const resources = {
	en: {
		ns1: en,
	},
	es: {
		ns1: en,
	},
} as const;

export type TranslationKey = keyof typeof resources.en.ns1;

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		defaultNS,
		fallbackLng: "en",

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources,
	});

export default i18n;
