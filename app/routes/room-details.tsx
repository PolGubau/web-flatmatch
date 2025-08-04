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




export default function RoomDetails({
  params,
}: Route.ComponentProps) {
  params.roomId;

  return (
    <div>
      <h1>Room Details</h1>
      <p>Room ID: {params.roomId}</p>
      {/* Render room details here */}
    </div>
  );
}