import FavsPage from "src/global/pages/Favs";
import type { Route } from "./+types/favs";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Flatmatch" },
    { name: "description", content: "Welcome to Flatmatch!" },
  ];
}


export default function Favs() {
  return <FavsPage />;
}
