import type { Room } from "~/entities/room/room";
import { VerifiedChip } from "~/shared/ui/verified/chip";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";

export function RoomTinderCardUI({ room }: { room: Room }) {
	const imagesAmount = (room.images.main ? 1 : 0) + room.images.gallery.length;
	const imageMode = imagesAmount > 3 ? 3 : imagesAmount > 2 ? 2 : imagesAmount > 1 ? 1 : 0;
	const { main, gallery } = room.images;

	return (
		// gradient from black to transparent
		<article className="relative group w-full h-full bg-primary/10 pointer-events-none">
			<div className="bg-gradient-to-tr from-black w-full h-full inset-0 absolute to-transparent rounded-lg" />

			<header className="absolute bottom-0 left-0 p-4 pb-6 flex flex-col gap-2 z-10">
				{room.isVerified && <VerifiedChip />}

				<h2 className="text-canvas text-2xl text-pretty line-clamp-2">{room.title} </h2>

				{room.price.amount && (
					<p className="text-canvas/60 text-sm">
						{currencyFormat(room.price.amount, room.price.currency)}
					</p>
				)}

				<p className="text-sm text-canvas/70 line-clamp-2">{room.description}</p>
			</header>

			<div className={`grid h-full ${imageMode === 1 ? "grid-rows-[2fr_1fr]" : ""}`}>
				<img alt={room.title} className="object-cover h-full object-bottom w-full" src={main} />
				{(imageMode === 2 || imageMode === 3) && (
					<div className={`grid ${imageMode === 2 ? "grid-cols-1" : "grid-cols-2"}`}>
						{gallery.slice(0, 2).map((image) => (
							<img
								alt={room.title}
								className="object-cover h-full object-bottom w-full"
								key={image}
								src={image}
							/>
						))}
					</div>
				)}
			</div>
		</article>
	);
}
