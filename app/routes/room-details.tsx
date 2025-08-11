import { useRoom } from "~/features/room/model/useRoom";
import type { Route } from "./+types/room-details";
import { Link } from "react-router";

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




export default function RoomDetails({
  params,
}: Route.ComponentProps) {
  params.roomId;

  const { room } = useRoom(params.roomId);
  const image = room?.images.gallery[room.images.main]
  return (
    <section className="flex flex-col gap-4"> 
      <Link to={'/favs'} className="text-xs w-fit py-1 rounded-full hover:bg-foreground/5 transition-all px-2"> &lt; Go Back</Link>

      <img src={image} alt="Room Image" className="rounded-t-2xl"/>
      <h1 className="text-pretty text-xl max-md:max-w-xs">{ room?.title}</h1>
      <p>{room?.location.address}</p>
      <p className="text-foreground/80">{room?.description}</p>
      <p>  {room?.price.amount} {room?.price.currency}</p>
      


      <ul>
        <li>
          {room?.commodities.whole?.area}
        </li>
      </ul>
    </section>
  );
}