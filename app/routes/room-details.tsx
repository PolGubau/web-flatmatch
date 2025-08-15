import { Link } from "react-router";
import { useRoom } from "~/features/room/model/use-room";
import RoomDetails from "~/features/room/ui/details/room-details";
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
		<section className="flex flex-col gap-4">
			<Link
				className="text-xs w-fit py-1 rounded-full hover:bg-foreground/5 transition-all px-2"
				to={"/favs"}
			>
				{" "}
				&lt; Go Back
			</Link>

			{!room ? <p>Loading</p> : <RoomDetails room={room} />}
		</section>
	);
}
