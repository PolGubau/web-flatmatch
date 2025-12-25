import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { useEffect } from "react";

import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import { CACHE_CONFIG } from "~/global/constants";
import MainLayout from "~/global/layout/main-layout";
import { AuthContextProvider } from "~/global/supabase/auth-context";
import { LoadingSection } from "~/shared/components/pages/LoadingSection";
import { Toaster } from "~/shared/components/ui/sonner";
import "~/shared/i18n/i18n";
import { registerServiceWorker, setupInstallPrompt } from "~/shared/utils/pwa";
import "../src/global/app.css";
import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
	{ href: "https://fonts.googleapis.com", rel: "preconnect" },
	{
		crossOrigin: "anonymous",
		href: "https://fonts.gstatic.com",
		rel: "preconnect",
	},
	{
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
		rel: "stylesheet",
	},
];
export function HydrateFallback() {
	return (
		<MainLayout>
			<LoadingSection label="loading" />
		</MainLayout>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />

				{/* PWA Meta Tags */}
				<meta content="Flatmatch" name="application-name" />
				<meta content="yes" name="apple-mobile-web-app-capable" />
				<meta
					content="black-translucent"
					name="apple-mobile-web-app-status-bar-style"
				/>
				<meta content="Flatmatch" name="apple-mobile-web-app-title" />
				<meta
					content="Find your perfect roommate and flat sharing experience"
					name="description"
				/>
				<meta content="telephone=no" name="format-detection" />
				<meta content="yes" name="mobile-web-app-capable" />
				<meta content="#000000" name="theme-color" />

				{/* iOS Splash Screens */}
				<link
					href="/icons/icon-192x192.png"
					rel="apple-touch-icon"
					sizes="180x180"
				/>
				<link href="/icons/icon-512x512.png" rel="apple-touch-startup-image" />

				{/* Manifest */}
				<link href="/manifest.json" rel="manifest" />

				{/* Favicon */}
				<link
					href="/icons/icon-192x192.png"
					rel="icon"
					sizes="32x32"
					type="image/png"
				/>
				<link href="/icons/icon-192x192.png" rel="shortcut icon" />

				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<Toaster />
			</body>
		</html>
	);
}

// ✅ QueryClient instance outside component to prevent recreation on renders
const queryClient = new QueryClient({
	defaultOptions: {
		mutations: {
			onError: (error) => {
				console.error("Mutation error:", error);
			},
			retry: 1,
		},
		queries: {
			refetchOnWindowFocus: false,
			retry: (failureCount, error) => {
				// Don't retry on 4xx errors
				if (error instanceof Error && "statusCode" in error) {
					const statusCode = (error as { statusCode: number }).statusCode;
					if (statusCode >= 400 && statusCode < 500) return false;
				}
				return failureCount < 2;
			},
			staleTime: CACHE_CONFIG.medium,
		},
	},
});

export default function App() {
	useEffect(() => {
		// Register service worker for PWA
		registerServiceWorker();
		// Setup install prompt
		setupInstallPrompt();
	}, []);

	return (
		<AuthContextProvider>
			<QueryClientProvider client={queryClient}>
				<NuqsAdapter>
					<Outlet />
					{/* <ReactQueryDevtools buttonPosition="bottom-right" /> */}
				</NuqsAdapter>
			</QueryClientProvider>
		</AuthContextProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
