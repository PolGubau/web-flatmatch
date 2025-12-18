import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { ConversationWithMetadata } from "~/entities/message/conversation";
import { cn } from "~/shared/utils/utils";

interface ConversationItemProps {
	conversation: ConversationWithMetadata;
	isActive: boolean;
	onClick: () => void;
	currentUserId: string;
}

export const ConversationItem = ({
	conversation,
	isActive,
	onClick,
	currentUserId,
}: ConversationItemProps) => {
	const { otherParticipant, lastMessage, unreadCount } = conversation;
	const isUnread = unreadCount > 0;

	return (
		<button
			className={cn(
				"w-full p-3 flex gap-3 items-start hover:bg-muted/50 transition-colors border-b border-border/50",
				isActive && "bg-muted",
			)}
			onClick={onClick}
			type="button"
		>
			{/* Avatar */}
			<div className="relative flex-shrink-0">
				{otherParticipant.avatar ? (
					<img
						alt={otherParticipant.name}
						className="w-12 h-12 rounded-full object-cover"
						src={otherParticipant.avatar}
					/>
				) : (
					<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
						{otherParticipant.name.charAt(0).toUpperCase()}
					</div>
				)}
				{isUnread && (
					<div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
						{unreadCount}
					</div>
				)}
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0 text-left">
				<div className="flex justify-between items-start gap-2 mb-1">
					<h3
						className={cn("font-medium truncate", isUnread && "font-semibold")}
					>
						{otherParticipant.name}
					</h3>
					{lastMessage && (
						<span className="text-xs text-foreground/50 whitespace-nowrap">
							{formatDistanceToNow(lastMessage.sentAt, {
								addSuffix: true,
								locale: es,
							})}
						</span>
					)}
				</div>
				{lastMessage && (
					<p
						className={cn(
							"text-sm truncate text-foreground/70",
							isUnread && "font-medium text-foreground",
						)}
					>
						{lastMessage.senderId === currentUserId ? "Tú: " : ""}
						{lastMessage.content}
					</p>
				)}
			</div>
		</button>
	);
};
