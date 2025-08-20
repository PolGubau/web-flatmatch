import type { defaultNS, resources } from "~/shared/i18n/i18n";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: (typeof resources)["en"];
	}
}
