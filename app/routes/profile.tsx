import ProfilePage from "src/global/pages/Profile";
import type { Route } from "./+types/profile";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Flatmatch" },
    { name: "description", content: "Welcome to Flatmatch!" },
  ];
}

export default function Profile() {
  return <ProfilePage />;
}
