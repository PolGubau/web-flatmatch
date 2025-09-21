import { Mail01Icon, TelephoneIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";
import { Button } from "~/shared/components/ui/button";

type Props = {
	phone?: string;
	email?: string;
};
export function ContactButtons({ phone, email }: Props) {
	return (
		<nav className="flex gap-2 items-center">
			{phone && (
				<Link to={`tel:${phone}`}>
					<Button size={"sm"} variant={"outline"}>
						<HugeiconsIcon icon={TelephoneIcon} size={18} />
						Call
					</Button>
				</Link>
			)}
			{email && (
				<Link to={`mailto:${email}`}>
					<Button size={"sm"} variant={"ghost"}>
						<HugeiconsIcon icon={Mail01Icon} size={18} />
						Contact
					</Button>
				</Link>
			)}
		</nav>
	);
}
