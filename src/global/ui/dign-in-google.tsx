import type { accounts, CredentialResponse } from "google-one-tap";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { GOOGLE_ID } from "~/config";
import { supabase } from "../supabase/client";

declare const google: { accounts: accounts };

/**
 * Genera nonce y hashedNonce para Google One Tap
 */
const generateNonce = async (): Promise<[string, string]> => {
	const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
	const encoder = new TextEncoder();
	const encodedNonce = encoder.encode(nonce);
	const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

	return [nonce, hashedNonce];
};

export const OneTapComponent = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const initializeGoogleOneTap = async () => {
			const [nonce, hashedNonce] = await generateNonce();

			const { data: sessionData, error } = await supabase.auth.getSession();
			if (error) {
				console.error("Error getting session", error);
			}
			if (sessionData.session) {
				navigate("/");
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
						console.log("Session data: ", data);
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
	}, [navigate]);

	return null;
};
