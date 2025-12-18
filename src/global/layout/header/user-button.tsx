import { useNavigate } from "react-router";
import {
	SignInAvatar,
	YourAvatar,
} from "~/features/user/ui/profile/your-avatar";
import { useAuth } from "~/global/supabase/auth-context";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import { useSession } from "~/shared/context/session-context";
export const UserButton = () => {
	const { session } = useSession();
	const isLoggedIn = Boolean(session);
	const { signOut } = useAuth();
	const navigate = useNavigate();
	if (!isLoggedIn) {
		return <SignInAvatar />;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className="hover:border-primary text-foreground border border-foreground/5 p-px rounded-full cursor-pointer"
					type="button"
				>
					<YourAvatar />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => navigate("/profile")}>
					See my profile
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => signOut()} variant="error">
					Signout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
