import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";

type Props = {
	canGoBack?: boolean;
};
export function FormFooterButtons({ canGoBack = true }: Props) {
	return (
		<nav className="flex items-center gap-2 w-full justify-end-safe">
			{canGoBack && (
				<Link
					className="cursor-pointer hover:brightness-80 transition-all p-4 rounded-full flex gap-1 hover:underline items-center"
					to={"/publish"}
					type="submit"
				>
					<HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
					Back
				</Link>
			)}
			<button
				className="cursor-pointer hover:brightness-80 transition-all bg-primary p-4 px-8 justify-end text-white rounded-full flex gap-1 items-center"
				type="submit"
			>
				Next
				<HugeiconsIcon icon={ArrowRight01Icon} />
			</button>
		</nav>
	);
}
