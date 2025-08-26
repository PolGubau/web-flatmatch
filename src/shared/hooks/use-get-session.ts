import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "~/global/supabase/client";

export const useGetSession = () => {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const fetchSession = async () => {
			const { data, error } = await createClient().auth.getSession();
			if (error) {
				console.error(error);
			}

			setSession(data.session ?? null);
		};
		fetchSession();

		const {
			data: { subscription },
		} = createClient().auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => subscription.unsubscribe();
	}, []);

	return { session, setSession };
};
