import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "~/global/supabase/client";
import { LoadingSection } from "../components/pages/LoadingSection";
import { TranslationKeys } from "../i18n/i18n";

const SessionContext = createContext<{
	session: Session | null;
}>({
	session: null,
});

export const useSession = () => {
	const context = useContext(SessionContext);
	const navigate = useNavigate();

	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	const session = context.session;
	const check = () => {
		if (!session) {
			console.warn("No session found, redirecting to login");
			navigate("/auth/login");
		}
	};

	return { check, session };
};

type Props = { children: React.ReactNode };
export const SessionProvider = ({ children }: Props) => {
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: We want to run this effect only once on mount
	useEffect(() => {
		let mounted = true;

		// Fetch initial session immediately so consumers don't see `null` while a valid
		// session exists (prevents premature redirects from guards relying on session)
		(async () => {
			try {
				const {
					data: { session: initialSession },
				} = await supabase.auth.getSession();
				if (!mounted) return;
				setSession(initialSession ?? null);
			} catch (err) {
				console.warn("Failed to get initial session", err);
				if (!mounted) return;
				setSession(null);
			} finally {
				if (mounted) setIsLoading(false);
			}
		})();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			console.log("Auth state changed:", _event, session);
			setSession(session);
			setIsLoading(false);
		});

		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, [supabase]);

	return (
		<SessionContext.Provider value={{ session }}>
			{isLoading ? (
				<div className="flex h-screen w-full items-center justify-center">
					<LoadingSection label={TranslationKeys.loading_user} />
				</div>
			) : (
				children
			)}
		</SessionContext.Provider>
	);
};
