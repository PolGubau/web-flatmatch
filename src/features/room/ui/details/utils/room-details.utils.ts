import type { TranslationKey } from "~/shared/i18n/i18n";
import type { RentType } from "~/shared/types/common";

export const getRentTypeLabel = (rentType: RentType): TranslationKey => {
	switch (rentType) {
		case "private-room":
			return "private_room";
		case "shared-room":
			return "shared_room";
		case "entire-flat":
			return "entire_flat";
		default:
			return "private_room";
	}
};

export const createShareData = (
	title: string,
	formattedPrice: string,
	paymentFrequency: string,
	url: string,
): ShareData => ({
	text: `${title} - ${formattedPrice}/${paymentFrequency}`,
	title,
	url,
});
