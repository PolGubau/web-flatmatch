import { useState } from "react";
import { Outlet } from "react-router";
import { SignInGoogleButton } from "~/features/auth/ui/components/sign-in-google-button";
import { GoHomeButton } from "~/shared/components/go-home-button";
import { Button } from "~/shared/components/ui/button";

export default function AuthLayout() {
	const [useCredentials, setUseCredentials] = useState(false);

	return (
		<div className="md:pt-20 max-md:h-full">
			<section className="flex flex-col gap-4 h-full md:max-w-md mx-auto md:shadow-lg md:rounded-2xl bg-canvas overflow-hidden">
				<header
					className="grid grid-rows-[auto_1fr_auto] min-h-[30vh] md:shadow w-full gap-1 pt-3 p-2 md:p-4
bg-gradient-to-br from-primary/40 via-primary to-primary/60
bg-[length:200%_200%] animate-gradient-move"
				>
					<GoHomeButton />
					<div />
					<div className="">
						<h1 className="md:text-center max-md:px-3 font-regular tracking-wide line-clamp-1 text-canvas/80 text-4xl pb-3 ">
							Flatmatch
						</h1>
					</div>
				</header>

				<section className="overflow-y-auto p-4 flex flex-col gap-8">
					<SignInGoogleButton />
					<article>
						{!useCredentials ? (
							<Button className="w-full" onClick={() => setUseCredentials(true)} variant="outline">
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
