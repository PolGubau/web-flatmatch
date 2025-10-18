import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { ConversationWithMetadata } from "~/entities/message/conversation";
import { cn } from "~/shared/utils/utils";

interface ConversationItemProps {
	conversation: ConversationWithMetadata;
	isActive?: boolean;
	onClick: () => void;
}

export function ConversationItem({
	conversation,
	isActive,
	onClick,
}: ConversationItemProps) {
	const { otherParticipant, lastMessage, unreadCount, lastMessageAt } =
		conversation;

	return (
		<button
			className={cn(
				"w-full p-4 flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border-b border-neutral-200 dark:border-neutral-700",
				isActive && "bg-neutral-100 dark:bg-neutral-800",
			)}
			onClick={onClick}
			type="button"
		>
			{/* Avatar */}
			<div className="relative flex-shrink-0">
				<div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
					{otherParticipant.avatar ? (
						<img
							alt={otherParticipant.name}
							className="w-full h-full rounded-full object-cover"
							src={otherParticipant.avatar}
						/>
					) : (
						<span className="text-lg font-semibold text-primary">
							{otherParticipant.name.charAt(0).toUpperCase()}
						</span>
					)}
				</div>
				{unreadCount > 0 && (
					<div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{unreadCount}
					</div>
				)}
			</div>

			{/* Info */}
			<div className="flex-1 min-w-0 text-left">
				<div className="flex items-center justify-between mb-1">
					<h3 className="font-semibold text-sm truncate">
						{otherParticipant.name}
					</h3>
					<span className="text-xs text-neutral-500 flex-shrink-0 ml-2">
						{formatDistanceToNow(lastMessageAt, {
							addSuffix: true,
							locale: es,
						})}
					</span>
				</div>
				{lastMessage && (
					<p
						className={cn(
							"text-sm truncate",
							unreadCount > 0
								? "font-semibold text-foreground"
								: "text-neutral-600 dark:text-neutral-400",
						)}
					>
						{lastMessage.content}
					</p>
				)}
			</div>
		</button>
	);
}
