import { useState } from "react";
import type { RoomWithMetadata } from "~/entities/room/room";
import { ProfileAvatar } from "~/features/user/ui/profile/avatar";
import { VerifiedChip } from "~/shared/components/ui/verified/chip";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";

type RoomTinderUIProps = Pick<
	RoomWithMetadata,
	"title" | "description" | "images" | "price" | "verification" | "owner"
>;
export function RoomTinderCardUI({
	title,
	description,
	images,
	price,
	verification,
	owner,
}: RoomTinderUIProps) {
	const { cover, gallery } = images;
	const restImages = gallery?.filter((path) => path !== cover) || [];

	const sortedImages = [cover, ...restImages];
	const [currentImageIdx, setCurrentImageIndex] = useState(0);
	const goNextImage = () => {
		setCurrentImageIndex((idx) => (idx + 1) % sortedImages.length);
	};
	const goPrevImage = () => {
		setCurrentImageIndex((idx) =>
			idx === 0 ? sortedImages.length - 1 : idx - 1,
		);
	};

	return (
		// gradient from black to transparent
		<article className="relative group w-full h-full bg-primary/10">
			<div className="bg-gradient-to-tr from-black w-full h-full inset-0 absolute to-transparent rounded-lg z-10 pointer-events-none" />

			{/* current image index indicator */}
			<nav className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-none">
				{sortedImages.map((url, idx) => (
					<span
						className={`h-1 w-6 rounded-full ${
							idx === currentImageIdx ? "bg-canvas" : "bg-canvas/20"
						}`}
						key={url}
					/>
				))}
			</nav>

			<header className="absolute bottom-0 left-0 p-4 pb-6 flex flex-col gap-2 z-20 pointer-events-none">
				<div className="flex gap-2 mb-2 items-center">
					<ProfileAvatar
						avatarUrl={owner?.avatar ?? undefined}
						name={owner?.name}
						size="sm"
					/>
					<span className="text-canvas/70 text-sm self-center">
						{owner?.name ?? "Unknown"}
					</span>
				</div>

				{!!verification.verifiedAt && <VerifiedChip />}

				<h2 className="text-canvas text-xl text-pretty line-clamp-2">
					{title}
				</h2>

				{price.amount && (
					<p className="text-canvas/60 text-sm">
						{currencyFormat(price.amount, price.currency)}
					</p>
				)}

				<p className="text-sm text-canvas/70 line-clamp-4  whitespace-pre-wrap break-words">
					{description}
				</p>
			</header>

			<div className={`grid h-full relative`}>
				{/* invisible lateral buttons to change image */}

				<button
					className="absolute z-20 top-0 left-0 h-full w-1/2 opacity-0"
					onClick={goPrevImage}
					type="button"
				/>
				<button
					className="absolute z-20 top-0 right-0 h-full w-1/2 opacity-0"
					onClick={goNextImage}
					type="button"
				/>

				<img
					alt={title}
					className="object-cover h-full object-bottom w-full pointer-events-none"
					src={sortedImages[currentImageIdx]}
				/>
			</div>
		</article>
	);
}
