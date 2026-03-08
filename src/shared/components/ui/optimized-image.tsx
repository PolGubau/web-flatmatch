import { ImageOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "~/shared/utils/utils";

interface OptimizedImageProps {
	src: string;
	alt: string;
	className?: string;
	aspectRatio?: "square" | "video" | "portrait" | "auto";
	objectFit?: "cover" | "contain";
	priority?: boolean;
	onLoad?: () => void;
	onError?: () => void;
}

/**
 * Componente de imagen optimizado con:
 * - Lazy loading nativo
 * - Blur placeholder mientras carga
 * - Manejo de errores
 * - Aspect ratio responsive
 */
export const OptimizedImage = ({
	src,
	alt,
	className,
	aspectRatio = "auto",
	objectFit = "cover",
	priority = false,
	onLoad,
	onError,
}: OptimizedImageProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const aspectRatioClasses = {
		auto: "",
		portrait: "aspect-[3/4]",
		square: "aspect-square",
		video: "aspect-video",
	};

	const handleLoad = () => {
		setIsLoading(false);
		onLoad?.();
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);
		onError?.();
	};

	if (hasError) {
		return (
			<div
				className={cn(
					"w-full flex items-center justify-center bg-muted",
					aspectRatioClasses[aspectRatio],
					className,
				)}
			>
				<ImageOff className="w-12 h-12 text-muted-foreground/30" />
			</div>
		);
	}

	return (
		<div
			className={cn(
				"relative overflow-hidden",
				aspectRatioClasses[aspectRatio],
				className,
			)}
		>
			{/* Loading placeholder */}
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
					<Loader2 className="w-8 h-8 animate-spin text-muted-foreground/30" />
				</div>
			)}

			{/* Imagen optimizada */}
			<img
				alt={alt}
				className={cn(
					"w-full h-full transition-opacity duration-300",
					objectFit === "cover" ? "object-cover" : "object-contain",
					isLoading ? "opacity-0" : "opacity-100",
				)}
				decoding="async"
				loading={priority ? "eager" : "lazy"}
				onError={handleError}
				onLoad={handleLoad}
				src={src}
			/>
		</div>
	);
};
