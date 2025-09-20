import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";

import { cn } from "~/shared/utils/utils";

type Props = React.ComponentProps<typeof LabelPrimitive.Root> & {
	required?: boolean;
};

function Label({ className, required, ...props }: Props) {
	return (
		<span className="flex items-center">
			<LabelPrimitive.Root
				className={cn(
					"px-1 flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
					className,
				)}
				data-slot="label"
				{...props}
			/>
			{required && <HugeiconsIcon className="fill-error text-error" icon={StarIcon} size={10} />}
		</span>
	);
}

export { Label };
