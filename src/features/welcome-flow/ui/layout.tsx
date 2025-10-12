import { t } from "i18next";
import type { PropsWithChildren } from "react";
import { useSession } from "~/shared/context/session-context";

export const WelcomeFlowLayout = ({ children }: PropsWithChildren) => {
	const { session } = useSession();
	const name = session?.user.user_metadata.name;
	return (
		<div className="md:pt-20 max-md:h-full">
			<section className="flex flex-col gap-4 h-full md:max-w-md mx-auto md:shadow-lg md:rounded-2xl bg-canvas overflow-hidden">
				<header
					className="grid grid-rows-[auto_1fr_auto] md:shadow w-full gap-1 py-6 px-2 md:px-4
bg-gradient-to-br from-primary/40 via-primary to-primary/60
bg-[length:200%_200%] animate-gradient-move"
				>
					<div className="">
						<h1 className="md:text-center max-md:px-3 font-regular tracking-wide line-clamp-1 text-canvas/80 text-4xl pb-3 ">
							{name ? `Hi ${name}` : "Welcome"}
						</h1>
						<h2 className="md:text-center text-canvas/80">
							{t("lets_know_each_other")}
						</h2>
					</div>
				</header>
				<section className="md:p-4 overflow-y-auto p-2 flex flex-col gap-8">
					{children}
				</section>
			</section>
		</div>
	);
};
