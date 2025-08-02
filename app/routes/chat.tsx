import type { Route } from "./+types/chat";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Flatmatch" },
    { name: "description", content: "Welcome to Flatmatch!" },
  ];
}


export default function Chat() {
  return <>
    <h1>Chat</h1>
    <p>Welcome to the chat!</p>
  </>
}
