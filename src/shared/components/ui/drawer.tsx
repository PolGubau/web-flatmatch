import type { SheetProps } from "react-modal-sheet";
import { Sheet } from "react-modal-sheet";
import { cn } from "~/shared/utils/utils";

type Props = SheetProps & {
	footer?: React.ReactNode;
};

export const Drawer = ({
	children,
	isOpen,
	footer,
	onClose,
	...rest
}: Props) => {
	return (
		<Sheet
			detent={rest.detent ?? "content"}
			{...rest}
			isOpen={isOpen}
			onClose={onClose}
			unstyled
		>
			<Sheet.Container
				className={cn(
					"md:px-4 pt-4 md:mb-6 mb:pb-[max(env(safe-area-inset-bottom),16px)] !bg-transparent !shadow-none !left-1/2 translate-x-[-50%] grid grid-cols-[1fr_auto] gap-2",
					{
						"max-w-4xl ": rest.detent === "content",
					},
				)}
			>
				<div
					className={cn(
						"grid grid-rows-[1fr_auto] rounded-t-2xl md:rounded-2xl shadow-xl bg-canvas max-h-[96vh]",
						{
							"": rest.detent === "content",
						},
					)}
				>
					<Sheet.Header
						className="h-8 grid place-items-center"
						unstyled={false}
					>
						<Sheet.DragIndicator unstyled={false} />
					</Sheet.Header>

					<Sheet.Content className="flex-1 overflow-y-auto px-4 pb-[max(env(safe-area-inset-bottom),32px)] min-h-0 grid grid-cols-[1fr_auto] pointer-events-auto">
						{children}
						{footer && <div>{footer}</div>}
					</Sheet.Content>
				</div>
			</Sheet.Container>
			<Sheet.Backdrop onTap={onClose} unstyled={false} />
		</Sheet>
	);
};
