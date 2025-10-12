import { ThirdBracketIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { useSession } from "~/shared/context/session-context";
import { Button } from "../button";
import { Drawer } from "../drawer";

export const DevPopover = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const { session } = useSession();
	return (
		<>
			<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<div>
					<h2>Session</h2>

					<pre>{JSON.stringify(session, null, 2)}</pre>
				</div>
			</Drawer>

			<Button
				className="bg-foreground text-canvas rounded-full fixed max-md:bottom-16 bottom-2 left-2 grid place-items-center text-xs"
				onClick={() => setIsOpen(true)}
				size={"icon"}
				style={{ zIndex: 10 }}
				title="You are running in local mode"
			>
				<HugeiconsIcon className="w-5 h-5" icon={ThirdBracketIcon} />
			</Button>
		</>
	);
};
