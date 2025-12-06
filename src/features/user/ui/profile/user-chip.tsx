import { cn } from '~/shared/utils/utils'
import { ProfileAvatar } from './avatar'

type UserChipProps = {
  username: string
  className?: string
  avatarUrl?: string | null
}
export const UserChip = ({ username, avatarUrl, className }: UserChipProps) => {
  return (
    <div className={cn("w-fit flex gap-2 items-center rounded-full pr-3 text-background", className)}>
      <ProfileAvatar
        avatarUrl={avatarUrl}
        className="text-background bg-secondary/70"
        name={username}
        size="sm"
      />
      <span className="text-background/70 text-sm self-center line-clamp-1">
        {username ?? "Unknown"}
      </span>
    </div>
  )
}
