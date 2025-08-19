import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";

type Props = {
	backHref?: string;
};
export function FormFooterButtons({ backHref = "" }: Props) {
	return (
		<nav className="flex items-center gap-2 w-full justify-end-safe">
			{backHref?.length > 0 && (
				<Link
					className="cursor-pointer hover:brightness-80 transition-all p-4 rounded-full flex gap-1 hover:underline items-center"
					to={backHref}
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
