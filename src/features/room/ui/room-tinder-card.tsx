import { motion, useMotionValue, useTransform } from "motion/react";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import type { SwipeDirection } from "../types/common";
import { RoomTinderCardUI } from "./room-tinder-card-ui";

type RoomTinderCardProps = {
	room: RoomWithMetadata;
	onSwipe: (roomId: Room["id"], direction: SwipeDirection) => void;
	index: number;
};
export const RoomTinderCard = ({
	room,
	onSwipe,
	index,
}: RoomTinderCardProps) => {
	const isFront = index === 0;

	const x = useMotionValue(0);
	const opacity = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);
	const rotateRaw = useTransform(x, [-200, 200], [-10, 10]);
	const size = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);

	const colorOverlay = useTransform(
		x,
		[-500, 0, 500],
		["#ff000060", "#ffffff00", "#00ff0060"],
	);

	// Emoji feedback opacity (shows when dragging past threshold)
	const likeEmojiOpacity = useTransform(x, [0, 150, 200], [0, 0.5, 1]);
	const dislikeEmojiOpacity = useTransform(x, [-200, -150, 0], [1, 0.5, 0]);
	const likeEmojiScale = useTransform(x, [0, 150, 200], [0.5, 0.8, 1.2]);
	const dislikeEmojiScale = useTransform(x, [-200, -150, 0], [1.2, 0.8, 0.5]);

	const rotate = useTransform(() => {
		const amount = 2;
		const offset = isFront ? 0 : index % 2 === 0 ? -amount : amount;
		return `${rotateRaw.get() + offset}deg`;
	});

	const handleDragEnd = (
		_event: MouseEvent | TouchEvent,
		info: { offset: { x: number; y: number } },
	) => {
		if (Math.abs(info.offset.x) > 200) {
			onSwipe(room.id, info.offset.x > 0 ? "right" : "left");
		} else if (Math.abs(info.offset.y) > 200) {
			onSwipe(room.id, info.offset.y > 0 ? "down" : "up");
		} else {
			x.set(0);
		}
	};

	return (
		<motion.div
			className="h-full bg-neutral-500 backdrop-blur-md overflow-hidden w-[85vw] max-w-lg rounded-3xl hover:cursor-grab active:cursor-grabbing origin-bottom shadow shadow-neutral-500/10 relative"
			drag
			dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
			dragElastic={1}
			onDragEnd={handleDragEnd}
			style={{
				gridColumn: 1,
				gridRow: 1,
				opacity,
				pointerEvents: isFront ? "auto" : "none", // la de arriba es la interactiva
				rotate: rotate,
				scale: size,
				transition: "0.125s transform",
				x,
				zIndex: 10 - index,
			}}
		>
			<motion.div
				className="absolute inset-0 z-40 pointer-events-none  w-full h-full"
				style={{
					backgroundColor: colorOverlay,
				}}
			/>

			{/* Like emoji (right swipe) */}
			<motion.div
				className="absolute top-1/2 right-8 -translate-y-1/2 z-50 pointer-events-none text-8xl select-none"
				style={{
					opacity: likeEmojiOpacity,
					scale: likeEmojiScale,
				}}
			>
				💚
			</motion.div>

			{/* Dislike emoji (left swipe) */}
			<motion.div
				className="absolute top-1/2 left-8 -translate-y-1/2 z-50 pointer-events-none text-8xl select-none"
				style={{
					opacity: dislikeEmojiOpacity,
					scale: dislikeEmojiScale,
				}}
			>
				❌
			</motion.div>

			<RoomTinderCardUI
				description={room.description}
				images={room.images}
				owner={room.owner}
				price={room.price}
				title={room.title}
				verification={room.verification}
			/>
		</motion.div>
	);
};
