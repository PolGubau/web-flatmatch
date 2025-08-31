import { index, layout, prefix, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("./routes/providers/session-provider.tsx", [
		layout("../src/global/layout/base-layout.tsx", [
			// Auth routes (login, register...)
			layout("../src/global/layout/auth-layout.tsx", [
				route("auth/login", "./routes/auth/login.tsx"),
				route("auth/register", "./routes/auth/register.tsx"),
			]),
			route("welcome", "./routes/welcome.tsx"),

			// Main navigation flow
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

			// Publish room form
			layout("./routes/guards/auth-protected-guard.tsx", [
				layout("../src/global/layout/publish-form-layout.tsx", [
					...prefix("publish", [
						index("./routes/publish-form/step-1.tsx"),
						route("location", "./routes/publish-form/step-2.tsx"),
						route("commodities", "./routes/publish-form/step-3.tsx"),
						route("company", "./routes/publish-form/step-4.tsx"),
						route("metadata", "./routes/publish-form/step-5.tsx"),
						route("preferences", "./routes/publish-form/step-6.tsx"),
					]),
				]),
			]),
		]),
	]),
] satisfies RouteConfig;
