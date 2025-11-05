import { Drawer as D, type DialogProps } from "vaul";
import { cn } from "~/shared/utils/utils";

type Props = DialogProps & {
	footer?: React.ReactNode;
	className?: string;
	header?: React.ReactNode;
	title?: React.ReactNode;
	description?: React.ReactNode;
	classNames?: {
		overlay?: string;
		content?: string;
		header?: string;
		handle?: string;
		body?: string;
		footer?: string;
	};
};
export const Drawer = ({
	children,
	footer,
	className,
	header,
	classNames,
	title,
	description,
	...rest
}: Props) => {
	return (
		<D.Root {...rest}>
			<D.Portal>
				<D.Overlay
					className={cn(
						"fixed inset-0 bg-foreground/50 backdrop-blur-xs z-40",
						classNames?.overlay,
					)}
				/>
				<D.Content
					className={cn(
						"h-fit fixed flex justify-center bottom-0 left-0 right-0 mx-auto md:max-w-[90vw] outline-none z-50",
						classNames?.content,
					)}
				>
					<div
						className={cn(
							"bg-background grid grid-rows-[auto_1fr_auto] rounded-t-3xl md:rounded-3xl h-fit max-h-[90dvh] shadow-lg md:mb-4 md:max-w-4xl w-full transition-all",
							className,
						)}
					>
						<header
							className={cn("flex flex-col p-4 md:px-6", classNames?.header)}
						>
							<D.Handle className={classNames?.handle} />

							{title && (
								<D.Title className="text-lg font-semibold">{title}</D.Title>
							)}
							{description && (
								<D.Description className="text-sm text-foreground/60">
									{description}
								</D.Description>
							)}
							{header}
						</header>

						<section
							className={cn(
								"h-full overflow-y-auto relative p-4 md:px-6",
								classNames?.body,
							)}
						>
							{children}
						</section>
						{footer && (
							<div className={cn("p-4 md:p-6", classNames?.footer)}>
								{footer}
							</div>
						)}
					</div>
				</D.Content>
			</D.Portal>
		</D.Root>
	);
};
