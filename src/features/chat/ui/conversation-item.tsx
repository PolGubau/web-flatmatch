import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { t } from "i18next";
import type { ConversationWithMetadata } from "~/entities/message/conversation";
import { ProfileAvatar } from "~/features/user/ui/profile/avatar";
import { cn } from "~/shared/utils/utils";

interface ConversationItemProps {
	conversation: ConversationWithMetadata;
	isActive: boolean;
	currentUserId: string;
}

export const ConversationItem = ({
	conversation,
	isActive,
	currentUserId,
}: ConversationItemProps) => {
	const { otherParticipant, lastMessage, unreadCount } = conversation;
	const isUnread = unreadCount > 0;

	return (
		<div
			className={cn(
				"w-full p-3 flex gap-3 items-start hover:bg-muted/50 transition-colors border-b border-foreground/10 cursor-pointer",
				isActive && "bg-primary/10",
			)}
		>
			{/* Avatar */}
			<div className="relative shrink-0">
				<ProfileAvatar
					avatarUrl={otherParticipant.avatar}
					name={otherParticipant.name}
					size="sm"
				/>

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
						className={cn("font-medium truncate line-clamp-1", isUnread && "font-semibold")}
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
						{lastMessage.senderId === currentUserId ? `${t("you")}: ` : ""}
						{lastMessage.content}
					</p>
				)}
			</div>
		</div>
	);
};
