import { useState } from "react";
import { Outlet } from "react-router";
import { SignInGoogleButton } from "~/features/auth/ui/components/sign-in-google-button";
import { GoHomeButton } from "~/shared/components/go-home-button";
import { Button } from "~/shared/components/ui/button";

export default function AuthLayout() {
	const [useCredentials, setUseCredentials] = useState(false);

	return (
		<div className="pt-6 md:pt-20">
			<section className="flex flex-col gap-2 md:max-w-md mx-auto shadow-lg rounded-2xl bg-canvas overflow-hidden">
				<header className="grid grid-rows-[auto_1fr_auto] min-h-[30vh] shadow-lg w-full gap-1 pt-2 bg-primary/20 p-2 md:p-4">
					<GoHomeButton />
					<div />
					<div className="">
						<h1 className="text-center font-bold text-foreground/80 text-4xl pb-2">Flatmatch</h1>
					</div>
				</header>

				<section className="md:p-4 overflow-y-auto p-2 flex flex-col gap-8">
					<SignInGoogleButton />
					<article>
						{!useCredentials ? (
							<Button onClick={() => setUseCredentials(true)} variant="outline">
								Or use email and password
							</Button>
						) : (
							<Outlet />
						)}
					</article>
				</section>
			</section>
		</div>
	);
}
