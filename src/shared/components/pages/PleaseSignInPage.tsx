import {
	LookTopIcon,
	UserAdd01Icon,
	UserUnlock01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";

export const PleaseSignInPage = () => {
	return (
		<div className="flex flex-col md:items-center justify-center md:pt-20 gap-6 p-4">
			<HugeiconsIcon icon={LookTopIcon} size={100} />
			<header className="flex flex-col gap-3">
				<h1 className="text-3xl font-bold md:text-center text-pretty">
					Use your account to access here
				</h1>
				<p className="text-lg md:text-center text-foreground/70 text-balance">
					We don't know you yet, please sign in.
				</p>
			</header>

			<nav className="flex flex-col justify-center gap-4 mt-8">
				<Link
					className="flex gap-4 p-4 bg-primary text-background rounded-xl hover:bg-primary/80 transition-all hover:outline-2 duration-75 focus:outline-4 outline-primary"
					to="/auth/login"
				>
					<HugeiconsIcon icon={UserUnlock01Icon} strokeWidth={2} />

					<div className="flex flex-col gap-1">
						<h2 className="text-xl">Sign In</h2>
						<small>
							Use your account to access your profile, publish rooms and more!
						</small>
					</div>
				</Link>

				<Link
					className="flex gap-4 p-4 bg-background text-foreground rounded-xl hover:bg-foreground/5 hover:outline-2 transition-all duration-75 focus:outline-4 outline-primary"
					to="/auth/register"
				>
					<HugeiconsIcon icon={UserAdd01Icon} />

					<div className="flex flex-col gap-1">
						<h2 className="text-xl">Register</h2>
						<small>Create an account to start using Flatmatch!</small>
					</div>
				</Link>
			</nav>
		</div>
	);
};
