import type { Session } from "@supabase/supabase-js";
import { createContext, type PropsWithChildren, useContext } from "react";
import { type SignInParams, signInUser } from "~/shared/auth/sign-in";
import { signOutSession } from "~/shared/auth/sign-out";
import { useGetSession } from "~/shared/hooks/use-get-session";
import { signUpNewUser } from "../../shared/auth/sign-up";

type AuthContextType = {
	session: Session | null;
	signUp: (params: SignInParams) => Promise<void>;
	signIn: (params: SignInParams) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	session: null,
	signIn: () => Promise.resolve(),
	signOut: () => Promise.resolve(),
	signUp: () => Promise.resolve(),
});

type AuthContextProviderProps = PropsWithChildren;

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const { session, setSession } = useGetSession();

	const signUp = async (params: SignInParams) => {
		const fn = await signUpNewUser(params);
		if (fn.success) {
			setSession(fn.data);
		} else {
			console.error("Error signing up:", fn.error);
		}
	};
	const signIn = async (params: SignInParams) => {
		const fn = await signInUser(params);
		if (fn.success) {
			setSession(fn.session);
		} else {
			console.error("Error signing in:", fn.error);
		}
	};
	const signOut = async () => {
		const fn = await signOutSession();
		if (!fn.success) {
			console.error("Error signing out:", fn.error);
		}
	};

	const value = { session, signIn, signOut, signUp };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const userAuth = () => {
	return useContext(AuthContext);
};
