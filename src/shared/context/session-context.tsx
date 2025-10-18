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
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			console.log("Auth state changed:", _event, session);
			setSession(session);
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
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
