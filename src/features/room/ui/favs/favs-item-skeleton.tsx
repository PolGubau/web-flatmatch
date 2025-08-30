import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AbsoluteLikedHeart } from "./LikedHearth";

export function RoomFavsListItemSkeleton() {
	return (
		<li className="cursor-progress select-none">
			<div className="bg-foreground/5 transition-opacity rounded-xl gap-4 grid grid-cols-[auto_1fr_auto] overflow-hidden">
				<div className="relative">
					<div className=" w-24 h-full object-cover bg-foreground/30" />
					<AbsoluteLikedHeart />
				</div>
				<div className="flex flex-col p-2 gap-1 justify-between">
					<h2 className="line-clamp-2 flex flex-col gap-1 h-12 ">
						<p className="bg-foreground/30 rounded-xl line-clamp-1 text-transparent w-full animate-pulse">
							Lorem ipsum, dolor sit amet consectetur
						</p>
						<p className="bg-foreground/30 rounded-xl line-clamp-1 text-transparent w-3/4 animate-pulse">
							Lorem ipsum, dolor sit amet consectetur
						</p>
					</h2>
					<p className="text-sm line-clamp-2 bg-foreground/10 rounded-xl animate-pulse text-transparent">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ex amet quos
						nulla voluptatum eaque nam unde, dolorum necessitatibus? Ratione, repellendus esse?
						Eligendi beatae laudantium quae explicabo ratione accusamus tempore.
					</p>
					<p className="text-sm text-transparent bg-foreground/10 rounded-xl w-fit animate-pulse pointer-events-none">
						lorem ips
					</p>
				</div>

				<footer className="flex ">
					<HugeiconsIcon
						className="mt-4 mr-4 group-hover:mt-3 group-hover:mr-3 transition-all ease-in-out"
						icon={ArrowUpRight03Icon}
						size={20}
					/>
				</footer>
			</div>
		</li>
	);
}
