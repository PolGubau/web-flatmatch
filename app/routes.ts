import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("../src/global/layout/main-layout.tsx", [
    index("./routes/home.tsx"),
    route("favs", "./routes/favs.tsx"),
    route("chat", "./routes/chat.tsx"),
    route("profile", "./routes/profile.tsx"),

    // details page
    route("room/:roomId", "./routes/room-details.tsx"),



    // 404
    route("*", "./routes/catchall.tsx")
  ]),
] satisfies RouteConfig;
