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
		<nav className="gap-4 grid grid-cols-2">
			{phone && (
				<Button asChild type="button">
					<Link to={`tel:${phone}`}>
						<HugeiconsIcon icon={TelephoneIcon} size={30} />
						Call
					</Link>
				</Button>
			)}
			{email && (
				<Button asChild type="button">
					<Link to={`mailto:${email}`}>
						<HugeiconsIcon icon={Mail01Icon} size={30} />
						Contact
					</Link>
				</Button>
			)}
		</nav>
	);
}
