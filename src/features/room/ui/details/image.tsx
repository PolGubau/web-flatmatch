type Props = {
	src: string;
	alt: string;
};
export function RoomDetailsImage({ src, alt }: Props) {
	return (
		<div>
			<img
				alt={alt}
				className="h-full w-full aspect-video object-cover rounded-2xl"
				src={src}
			/>
		</div>
	);
}
