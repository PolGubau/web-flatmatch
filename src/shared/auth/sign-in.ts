import type { AuthError, Session, User, WeakPassword } from "@supabase/supabase-js";
import { supabase } from "../../global/supabase/client";

export type SignInResponse =
	| {
			session: Session;
			user: User;
			success: true;
	  }
	| {
			error: AuthError | Error;
			success: false;
	  };

export type SignInParams = {
	email: string;
	password: string;
};
export type SignInFn = (params: SignInParams) => Promise<SignInResponse>;

export const signInUser: SignInFn = async ({ email, password }) => {
	try {
		const {
			data: { session, user },
			error,
		} = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error("Error signing in:", error);
			return { error, success: false };
		} else if (!session) {
			return { error: new Error("No session found"), success: false };
		} else {
			return { session, success: true, user };
		}
	} catch (error) {
		console.error("Handled error signing in:", error);
		return { error: error as Error, success: false };
	}
};
