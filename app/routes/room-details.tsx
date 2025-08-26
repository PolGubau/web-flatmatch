import { ArrowLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";
import { useRoom } from "~/features/room/model/use-room";
import RoomDetails from "~/features/room/ui/details/room-details";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";
import type { Route } from "./+types/room-details";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: `Room Details - ${data}` },
		{ content: "Welcome to Flatmatch!", name: "description" },
	];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	return params.roomId;
}

export default function RoomDetailsPage({ params }: Route.ComponentProps) {
	const { room } = useRoom(params.roomId);

	return (
		<div className="overflow-y-auto overflow-x-hidden max-w-4xl mx-auto ">
			<header className="px-2">
				<Link
					className="text-xs w-fit py-1 flex gap-1 rounded-full hover:bg-foreground/5 transition-all px-2"
					to={"/favs"}
				>
					<HugeiconsIcon icon={ArrowLeftIcon} size={15} />
					Return to list
				</Link>
			</header>

			{!room ? <LoadingSection /> : <RoomDetails room={room} />}
		</div>
	);
}
