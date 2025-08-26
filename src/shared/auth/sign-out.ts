import { supabase } from "../../global/supabase/client";

export type SignOutResponse =
	| {
			success: true;
	  }
	| {
			error: Error;
			success: false;
	  };
export type SignOutFn = () => Promise<SignOutResponse>;

export const signOutSession: SignOutFn = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error("Error signing out:", error);
		return { error, success: false };
	}
	return { success: true };
};
