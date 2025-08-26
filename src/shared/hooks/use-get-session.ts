import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "~/global/supabase/client";

export const useGetSession = () => {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const fetchSession = async () => {
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				console.error(error);
			}

			setSession(data.session ?? null);
		};
		fetchSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => subscription.unsubscribe();
	}, []);

	return { session, setSession };
};
