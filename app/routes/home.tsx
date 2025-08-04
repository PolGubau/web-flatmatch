import HomePage from "src/global/pages/Home";

export function meta() {
  return [
    { title: "Flatmatch" },
    { name: "description", content: "Welcome to Flatmatch!" },
  ];
}

export default function Home() {
  return <HomePage />;
}
