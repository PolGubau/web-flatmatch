import i18n from "i18next";
import type { RoomWithMetadata } from "~/entities/room/room";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";
import { RoomGridCard } from "./room-grid-card";

type Props = {
  rooms: RoomWithMetadata[];
};

export function RoomGrid({ rooms }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms?.map((room) => {
        const formattedPrice = currencyFormat(
          room.price.amount,
          room.price.currency,
          i18n.language,
        );
        return (
          <RoomGridCard
            availableFrom={room.timings?.availableFrom}
            description={room.description}
            id={room.id}
            image={room.images.cover}
            isFavorite={room.interaction.action === "like"}
            key={room.id}
            location={room.location?.city}
            price={formattedPrice}
            title={room.title}
          />
        );
      })}
    </div>
  );
}
