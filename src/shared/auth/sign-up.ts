import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../global/supabase/client";
import type { SignInParams } from "./sign-in";

export type SignUpResponse =
	| {
			data: Session;
			success: true;
	  }
	| {
			error: Error;
			success: false;
	  };
export type SignUpFn = (params: SignInParams) => Promise<SignUpResponse>;

export const signUpNewUser: SignUpFn = async (params) => {
	const { data, error } = await supabase.auth.signUp({
		email: params.email,
		password: params.password,
	});
	console.log(data);
	if (error) {
		console.error("Error signing up:", error);
		return { error, success: false };
	} else if (!data?.session) {
		return { error: new Error("No session found"), success: false };
	} else {
		return { data: data.session, success: true };
	}
};
