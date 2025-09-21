import type { Session } from "@supabase/supabase-js";
import { createContext, type PropsWithChildren, useContext } from "react";
import {
	type SignInParams,
	type SignInResponse,
	signInUser,
} from "~/shared/auth/sign-in";
import { type SignOutResponse, signOutSession } from "~/shared/auth/sign-out";
import { useSession } from "~/shared/context/session-context";
import { type SignUpResponse, signUpNewUser } from "../../shared/auth/sign-up";

type AuthContextType = {
	session: Session | null;
	signUp: (params: SignInParams) => Promise<SignUpResponse>;
	signIn: (params: SignInParams) => Promise<SignInResponse>;
	signOut: () => Promise<SignOutResponse>;
};

const AuthContext = createContext<AuthContextType>({
	session: null,
	signIn: () =>
		Promise.resolve({ error: new Error("Not implemented"), success: false }),
	signOut: () =>
		Promise.resolve({ error: new Error("Not implemented"), success: false }),
	signUp: () =>
		Promise.resolve({ error: new Error("Not implemented"), success: false }),
});

type AuthContextProviderProps = PropsWithChildren;

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const { session } = useSession();

	const signUp = async (params: SignInParams) => {
		const fn = await signUpNewUser(params);
		if (fn.success) {
			// setSession(fn.data);
		} else {
			console.error("Error signing up:", fn.error);
		}
		return fn;
	};
	const signIn = async (params: SignInParams) => {
		const fn = await signInUser(params);
		if (fn.success) {
			// setSession(fn.session);
		} else {
			console.error("Error signing in:", fn.error);
		}
		return fn;
	};
	const signOut = async () => {
		const fn = await signOutSession();
		if (!fn.success) {
			console.error("Error signing out:", fn.error);
		}
		return fn;
	};

	const value = { session, signIn, signOut, signUp };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
	return ctx;
};
