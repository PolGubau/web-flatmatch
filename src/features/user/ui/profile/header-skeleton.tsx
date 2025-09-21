import { ProfileAvatar } from "./avatar";

export function ProfileHeaderSkeleton() {
	return (
		<header className="grid grid-cols-[auto_1fr] gap-6 select-none">
			<ProfileAvatar avatarUrl={undefined} name={"lorem"} size="md" />
			<div className="flex flex-col gap-2">
				<div className="grid w-fit grid-cols-[1fr_auto] gap-2 items-center ">
					<span className="loading">Pol Gubau Amores</span>
				</div>
				<div className="flex flex-col gap-1">
					<p className="loading max-md:text-sm line-clamp-3">
						Busco una habitación en un piso en Barcelona, soy tranquilo y no
						salgo de fiesta. Tengo 23 años, trabajo de camarero.
					</p>
					<small className="loading line-clamp-1">Lorem ipsum dolor</small>
				</div>
			</div>
		</header>
	);
}
