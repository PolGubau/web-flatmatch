import { index, layout, prefix, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("../src/global/layout/base-layout.tsx", [
		// header + navbar
		layout("../src/global/layout/main-layout.tsx", [
			index("./routes/home.tsx"),
			route("favs", "./routes/favs.tsx"),
			route("chat", "./routes/chat.tsx"),
			...prefix("profile", [
				index("./routes/your-profile.tsx"),
				route(":userId", "./routes/profile.tsx"),
			]),
			// details page
			...prefix("room", [route(":roomId", "./routes/room-details.tsx")]),
		]),

		layout("../src/features/publish-room/ui/layout/form-layout.tsx", [
			...prefix("publish", [
				index("./routes/publish-form/step-1.tsx"),
				route("location", "./routes/publish-form/step-2.tsx"),
				route("commodities", "./routes/publish-form/step-3.tsx"),
				route("company", "./routes/publish-form/step-4.tsx"),
			]),
		]),

		// route("publish-room", "./routes/publish-form/step1.tsx"),

		// ...prefix("publish-room", [
		//   index("./routes/publish-form/step1-type.tsx"),
		//   route("step2-property", "./routes/publish-form/step2-property.tsx"),
		// ]),
	]),
] satisfies RouteConfig;
