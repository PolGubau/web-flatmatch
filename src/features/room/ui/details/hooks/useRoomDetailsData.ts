import i18n from "i18next";
import type { RoomWithMetadata } from "~/entities/room/room";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";

export const useRoomDetailsData = (room: RoomWithMetadata) => {
	const cover = room?.images?.cover;
	const allImages = room?.images?.gallery;

	const { female, male, other } = room.whoIsLiving?.currentTenants ?? {
		female: 0,
		male: 0,
		other: 0,
	};

	const peopleAmount = female + male + other;

	const formattedPrice = currencyFormat(
		room.price.amount,
		room.price.currency,
		i18n.language,
	);

	const isFavourite = room?.interaction?.action === "like";

	// Gallery with the main first
	const sortedImages = [cover, ...allImages.filter((path) => path !== cover)];

	const availableFrom = room.timings.availableFrom
		? new Date(room.timings.availableFrom)
		: null;

	const minimumStay = room.timings.minimumStay;

	const roommatesData = {
		female,
		male,
		other,
		total: peopleAmount,
	};

	return {
		allImages,
		availableFrom,
		cover,
		formattedPrice,
		isFavourite,
		minimumStay,
		roommatesData,
		sortedImages,
	};
};
