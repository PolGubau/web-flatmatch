import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { Message } from "~/entities/message/message";
import { cn } from "~/shared/utils/utils";

interface MessageItemProps {
	message: Message;
	isOwn: boolean;
	showTime: boolean;
}

export const MessageItem = ({ message, isOwn, showTime }: MessageItemProps) => {
	return (
		<div className={cn("flex mb-2", isOwn ? "justify-end" : "justify-start")}>
			<div
				className={cn("max-w-[75%] w-fit flex flex-col gap-1", {
					"items-end": isOwn,
				})}
			>
				<div
					className={cn(
						"py-2 px-3 rounded-2xl text-sm break-words",
						isOwn
							? "bg-primary text-primary-foreground rounded-br-sm"
							: "bg-muted text-foreground rounded-bl-sm",
					)}
				>
					{message.content}
				</div>
				{showTime && (
					<span className="text-xs text-foreground/40 px-2">
						{formatDistanceToNow(message.sentAt, {
							addSuffix: true,
							locale: es,
						})}
					</span>
				)}
			</div>
		</div>
	);
};
