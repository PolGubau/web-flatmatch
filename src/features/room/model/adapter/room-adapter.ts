import type { EditableRoom } from "~/entities/room/editable-room";
import type { AvailableCity } from "~/entities/room/editable-room.schema";
import type { Room } from "~/entities/room/room";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";
import type { RoomDto } from "../../infra/dto/room.dto";

// 1. from DTO to Room
export function mapDtoToRoom(dto: RoomDto): Room {
	return {
		...dto,
		location: {
			...dto.location,
			city: dto.location.city as AvailableCity,
		},
		price: {
			...dto.price,
			localePrice: currencyFormat(dto.price.amount, dto.price.currency),
		},
	};
}

//  2. from Room to DTO

export function mapRoomToDto(room: Room): RoomDto {
	// delete the localePrice as it is not needed in the DTO

	// biome-ignore lint/correctness/noUnusedVariables: We need to keep the price object intact
	const { localePrice, ...price } = room.price;
	return {
		...room,
		price,
	};
}

function roomToEditable(room: Room): EditableRoom {
	// biome-ignore lint/correctness/noUnusedVariables: We want to exclude those values
	const { id, createdAt, updatedAt, ...editableRoom } = room;

	return editableRoom;
}

export const roomAdapter = {
	mapDtoToRoom,
	mapRoomToDto,
	roomToEditable,
};
