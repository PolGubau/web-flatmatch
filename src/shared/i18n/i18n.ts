import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";
import en from "./locales/en.json" with { type: "json" };
import es from "./locales/es.json" with { type: "json" };

export type TranslationKey = keyof typeof resources.en.ns1;

const keys = Object.keys(en) as (keyof typeof en)[];
export const TranslationKeys = Object.fromEntries(keys.map((k) => [k, k])) as {
	[K in TranslationKey]: K;
};

export const defaultNS = "ns1";

export const resources = {
	en: {
		ns1: en,
	},
	es: {
		ns1: es,
	},
} as const;

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		defaultNS,
		fallbackLng: "en",

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources,
	});

export default i18n;
