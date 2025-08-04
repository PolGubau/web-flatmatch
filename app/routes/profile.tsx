import ProfilePage from "src/global/pages/Profile";

export function meta() {
  return [
    { title: "Flatmatch" },
    { name: "description", content: "Welcome to Flatmatch!" },
  ];
}

export default function Profile() {
  return <ProfilePage />;
}
