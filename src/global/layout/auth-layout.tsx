import { useState } from "react";
import { Outlet } from "react-router";
import { SignInGoogleButton } from "~/features/auth/ui/components/sign-in-google-button";
import { GoHomeButton } from "~/shared/components/go-home-button";
import { Button } from "~/shared/components/ui/button";

export default function AuthLayout() {
	const [useCredentials, setUseCredentials] = useState(false);

	return (
		<div className="md:pt-20">
			<section className="flex flex-col gap-2 p-2 md:p-4 max-w-md mx-auto shadow-lg rounded-2xl bg-canvas">
				<header className="w-full flex flex-col gap-1">
					<GoHomeButton />
				</header>
				<section className="overflow-y-auto p-2 flex flex-col gap-2">
					<SignInGoogleButton />
					{!useCredentials ? (
						<Button onClick={() => setUseCredentials(true)} variant="outline">
							Or use email and password
						</Button>
					) : (
						<Outlet />
					)}
				</section>
			</section>
		</div>
	);
}
