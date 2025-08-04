import FavsPage from "src/global/pages/Favs";

export function meta() {
  return [
    { title: "Flatmatch" },
    { name: "description", content: "Welcome to Flatmatch!" },
  ];
}


export default function Favs() {
  return <FavsPage />;
}
