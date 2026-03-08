import { Skeleton } from "~/shared/components/ui/skeleton";

/**
 * Skeleton que coincide EXACTAMENTE con RoomTinderCard
 * Replica la estructura visual para evitar CLS
 */
export const RoomCardStackSkeleton = () => {
	return (
		<div className="relative w-full max-w-[500px] mx-auto">
			{/* Carta de fondo (simula el stack) */}
			<div className="absolute inset-0 rotate-2 scale-95 opacity-20">
				<div className="w-full h-[60vh] rounded-3xl bg-muted" />
			</div>

			{/* Carta principal */}
			<article className="relative w-full h-[60vh] bg-primary/10 rounded-3xl overflow-hidden shadow-2xl">
				{/* Indicadores de imagen (dots) */}
				<nav className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
					{[1, 2, 3].map((i) => (
						<span
							className={`h-1 w-6 rounded-full ${
								i === 1 ? "bg-background" : "bg-background/20"
							} animate-pulse`}
							key={i}
						/>
					))}
				</nav>

				{/* Imagen de fondo */}
				<Skeleton className="absolute inset-0 w-full h-full rounded-none" />

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent z-10 pointer-events-none" />

				{/* Contenido inferior */}
				<div className="absolute bottom-0 left-0 p-3 pb-4 md:p-4 md:pb-6 flex flex-col gap-1.5 md:gap-2 z-20 w-full">
					{/* User chip */}
					<div className="flex items-center gap-2 w-fit">
						<Skeleton className="h-8 w-8 rounded-full" />
						<Skeleton className="h-4 w-24" />
					</div>

					{/* Verified chip (opcional) */}
					<Skeleton className="h-5 w-20 rounded-full" />

					{/* Título */}
					<div className="space-y-1.5">
						<Skeleton className="h-6 w-3/4 bg-background/20" />
						<Skeleton className="h-6 w-1/2 bg-background/20" />
					</div>

					{/* Precio */}
					<Skeleton className="h-4 w-24 bg-background/20" />

					{/* Descripción */}
					<div className="space-y-1.5 mt-1">
						<Skeleton className="h-3 w-full bg-background/20" />
						<Skeleton className="h-3 w-5/6 bg-background/20" />
						<Skeleton className="h-3 w-4/6 bg-background/20" />
					</div>
				</div>
			</article>
		</div>
	);
};
