import { Spinner } from "~/shared/components/ui/spinner";

export function RoomTinderCardUILoader() {
	return (
		<article className="relative group w-full h-full bg-primary/10 pointer-events-none ">
			<div className="bg-gradient-to-tr from-black w-full h-full inset-0 absolute to-transparent rounded-lg" />

			<div className="grid place-items-center h-full w-full">
				<Spinner className="text-background" />
			</div>

			<header className="absolute bottom-0 left-0 p-4 pb-6 flex flex-col gap-2 z-10">
				<h2 className="text-2xl text-pretty line-clamp-2  bg-background/20 text-transparent rounded-full w-fit">
					Loading first card of the pile
				</h2>

				<p className="text-sm bg-background/10 text-transparent rounded-full w-fit">
					XXX.XX €
				</p>

				<p className="text-sm bg-background/10 text-transparent rounded-full w-fit line-clamp-2">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
					inventore, corporis quisquam culpa cupiditate voluptatum
					exercitationem neque consequuntur nam aliquid? Laborum fugiat ipsa ut
					nobis odit facilis maxime excepturi a.
				</p>
			</header>

			<div className={`grid h-full "grid-rows-[2fr_1fr]`}>
				<div className="object-cover h-full object-bottom w-full" />
			</div>
		</article>
	);
}
