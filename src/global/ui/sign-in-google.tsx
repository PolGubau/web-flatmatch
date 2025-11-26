import type { accounts, CredentialResponse } from "google-one-tap";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { GOOGLE_ID } from "~/config";
import { supabase } from "../supabase/client";

declare const google: { accounts: accounts };

/**
 * Genera nonce y hashedNonce para Google One Tap
 */
const generateNonce = async (): Promise<[string, string]> => {
	const nonce = btoa(
		String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))),
	);
	const encoder = new TextEncoder();
	const encodedNonce = encoder.encode(nonce);
	const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashedNonce = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	return [nonce, hashedNonce];
};

export const OneTapComponent = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const initializeGoogleOneTap = async () => {
			const [nonce, hashedNonce] = await generateNonce();

			const { data: sessionData, error } = await supabase.auth.getSession();
			if (error) {
				console.error("Error getting session", error);
			}
			// If there's already a session, only redirect to `/` when the
			// OneTapComponent is rendered inside an auth page (login/register).
			// Otherwise, avoid forcing navigation on every page reload.
			if (sessionData.session) {
				const path = location.pathname || window.location.pathname;
				if (path.startsWith("/auth")) {
					navigate("/");
					return;
				}
				// If not on an auth route, don't initialize One Tap since user
				// is already authenticated.
				return;
			}

			google.accounts.id.initialize({
				callback: async (response: CredentialResponse) => {
					try {
						const { data, error } = await supabase.auth.signInWithIdToken({
							nonce,
							provider: "google",
							token: response.credential,
						});
						if (error) throw error;
						// Ensure Supabase has established the session before navigating.
						// In some mobile flows the auth state change may be delayed, which
						// causes route guards to run before the session is visible.
						console.log("Session data (signin result): ", data);
						const waitForSession = async (timeout = 3000) => {
							const start = Date.now();
							while (Date.now() - start < timeout) {
								const { data: sessionResp } = await supabase.auth.getSession();
								if (sessionResp.session) return sessionResp.session;
								// small delay
								await new Promise((r) => setTimeout(r, 150));
							}
							return null;
						};

						const session = await waitForSession(4000);
						if (!session) {
							// As a fallback, reload the page to let the SessionProvider pick up
							// the new session from storage/cookies. This is less ideal but
							// prevents the app from immediately redirecting to login.
							console.warn("Session not visible yet, reloading to pick it up");
							window.location.reload();
							return;
						}
						navigate("/");
					} catch (err) {
						console.error("Error logging in with Google One Tap", err);
					}
				},
				client_id: GOOGLE_ID,
				nonce: hashedNonce,
				use_fedcm_for_prompt: true,
			});

			google.accounts.id.prompt();
		};

		// inject the Google One Tap script dynamically
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = initializeGoogleOneTap;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [navigate, location]);

	return null;
};
