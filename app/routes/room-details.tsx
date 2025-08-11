import { Link } from "react-router";
import { useRoom } from "~/features/room/model/useRoom";
import RoomDetails from "~/features/room/ui/details/room-details";
import type { Route } from "./+types/room-details";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Room Details - ${data}` },
    { name: "description", content: "Welcome to Flatmatch!" },
  ];
}

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  return params.roomId;
}




export default function RoomDetailsPage({
  params,
}: Route.ComponentProps) {
  params.roomId;

  const { room } = useRoom(params.roomId);

  return (
    <section className="flex flex-col gap-4"> 
      <Link to={'/favs'} className="text-xs w-fit py-1 rounded-full hover:bg-foreground/5 transition-all px-2"> &lt; Go Back</Link>

{!room ? <p>Loading</p>:  <RoomDetails room={room} />}
    </section>
  );
}