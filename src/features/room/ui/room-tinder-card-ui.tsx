import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { RoomWithMetadata } from "~/entities/room/room";
import { UserChip } from "~/features/user/ui/profile/user-chip";
import { Button } from "~/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
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
	const navigate = useNavigate();

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
			<nav className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-none">
				{sortedImages.map((url, idx) => (
					<span
						className={`h-1 w-6 rounded-full ${idx === currentImageIdx ? "bg-background" : "bg-background/20"
							}`}
						key={url}
					/>
				))}
			</nav>

			<div className="grid grid-rows-[1fr_auto] h-full">
				<div className="grid grid-cols-2 opacity-0 h-full relative w-full">
					<button
						className="h-full z-10 w-full bg-red-500"
						onClick={goPrevImage}
						type="button"
					/>
					<button
						className="h-full z-10 w-full bg-green-500"
						onClick={goNextImage}
						type="button"
					/>
				</div>

				<header className="bottom-0 left-0 p-4 pb-6 flex flex-col gap-2 z-20 ">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="w-fit pl-0" variant="ghost">
								<UserChip
									avatarUrl={owner?.avatar ?? undefined}
									username={owner?.name ?? "Unknown"}
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>{owner?.name ?? "Unknown"}</DropdownMenuLabel>
							<DropdownMenuSeparator />

							<DropdownMenuItem className="justify-between"
								onSelect={() => navigate("/profile")}
							>
								See profile
								<ArrowRight />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{!!verification.verifiedAt && <VerifiedChip />}

					<h2 className="text-background text-xl text-pretty line-clamp-2">
						{title}
					</h2>

					{price.amount && (
						<p className="text-background/60 text-sm">
							{currencyFormat(price.amount, price.currency)}
						</p>
					)}

					<p className="text-sm text-background/70 line-clamp-4  whitespace-pre-wrap break-words">
						{description}
					</p>
				</header>
			</div>

			<div className="inset-0 absolute bg-gradient-to-tr from-black to-transparent rounded-lg z-10 pointer-events-none h-full" />
			<img
				alt={title}
				className="inset-0 absolute h-full object-cover object-bottom pointer-events-none"
				src={sortedImages[currentImageIdx]}
			/>
		</article>
	);
}
