import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "~/global/supabase/client";

export const useGetUser = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				console.error(error);
			}
			setUser(user ?? null);
		};
		fetchUser();
	}, []);

	return { user };
};
