type Props = {
	src: string;
	alt: string;
};
export function RoomDetailsImage({ src, alt }: Props) {
	return (
		<div>
			<img alt={alt} className="h-full w-full aspect-video object-cover" src={src} />
		</div>
	);
}
