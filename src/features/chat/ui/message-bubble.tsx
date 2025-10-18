import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Message } from "~/entities/message/message";
import { cn } from "~/shared/utils/utils";

interface MessageBubbleProps {
	message: Message;
	isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
	return (
		<div className={cn("flex mb-4", isOwn ? "justify-end" : "justify-start")}>
			<div
				className={cn(
					"max-w-[70%] rounded-2xl px-4 py-2",
					isOwn
						? "bg-primary text-white rounded-br-sm"
						: "bg-neutral-200 dark:bg-neutral-700 text-foreground rounded-bl-sm",
				)}
			>
				<p className="text-sm break-words">{message.content}</p>
				<span
					className={cn(
						"text-xs mt-1 block",
						isOwn ? "text-white/70" : "text-neutral-500",
					)}
				>
					{format(message.sentAt, "HH:mm", { locale: es })}
				</span>
			</div>
		</div>
	);
}
