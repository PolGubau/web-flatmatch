import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { useHapticFeedback } from "~/shared/hooks/use-haptic-feedback";
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
	const triggerHaptic = useHapticFeedback();
	const hasTriggeredHaptic = useRef(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const opacity = useTransform(x, [-250, 0, 250], [0.7, 1, 0.7]);
	const rotateRaw = useTransform(x, [-250, 250], [-18, 18]);
	const size = useTransform(x, [-250, 0, 250], [0.95, 1, 0.95]);

	const colorOverlay = useTransform(
		x,
		[-400, 0, 400],
		["#ff000050", "#ffffff00", "#00ff0050"],
	);

	// Emoji feedback opacity (shows when dragging past threshold)
	const likeEmojiOpacity = useTransform(x, [0, 100, 150], [0, 0.6, 1]);
	const dislikeEmojiOpacity = useTransform(x, [-150, -100, 0], [1, 0.6, 0]);
	const likeEmojiScale = useTransform(x, [0, 100, 150], [0.7, 0.9, 1.3]);
	const dislikeEmojiScale = useTransform(x, [-150, -100, 0], [1.3, 0.9, 0.7]);

	const rotate = useTransform(() => {
		const amount = 2;
		const offset = isFront ? 0 : index % 2 === 0 ? -amount : amount;
		return `${rotateRaw.get() + offset}deg`;
	});

	// Trigger haptic feedback when crossing threshold
	useEffect(() => {
		const unsubscribe = x.on("change", (value) => {
			const threshold = 120;
			if (Math.abs(value) > threshold && !hasTriggeredHaptic.current) {
				triggerHaptic("medium");
				hasTriggeredHaptic.current = true;
			} else if (Math.abs(value) < threshold / 2) {
				hasTriggeredHaptic.current = false;
			}
		});

		return () => unsubscribe();
	}, [x, triggerHaptic]);

	const handleDragEnd = (
		_event: MouseEvent | TouchEvent | PointerEvent,
		info: {
			offset: { x: number; y: number };
			velocity: { x: number; y: number };
		},
	) => {
		const threshold = 120;
		const velocityThreshold = 500;

		// Check if swipe based on distance or velocity
		const shouldSwipeX =
			Math.abs(info.offset.x) > threshold ||
			Math.abs(info.velocity.x) > velocityThreshold;
		const shouldSwipeY =
			Math.abs(info.offset.y) > threshold ||
			Math.abs(info.velocity.y) > velocityThreshold;

		if (shouldSwipeX) {
			// Animate out with velocity
			const direction = info.offset.x > 0 ? "right" : "left";
			const exitX = direction === "right" ? 500 : -500;

			triggerHaptic("heavy");
			animate(x, exitX, {
				duration: 0.3,
				ease: "easeOut",
			});

			setTimeout(() => onSwipe(room.id, direction), 100);
		} else if (shouldSwipeY) {
			const direction = info.offset.y > 0 ? "down" : "up";
			const exitY = direction === "down" ? 500 : -500;

			triggerHaptic("heavy");
			animate(y, exitY, {
				duration: 0.3,
				ease: "easeOut",
			});

			setTimeout(() => onSwipe(room.id, direction), 100);
		} else {
			// Smooth return to center
			hasTriggeredHaptic.current = false;
			animate(x, 0, {
				damping: 30,
				stiffness: 300,
				type: "spring",
			});
			animate(y, 0, {
				damping: 30,
				stiffness: 300,
				type: "spring",
			});
		}
	};

	return (
		<motion.div
			className="h-full bg-neutral-500 backdrop-blur-md overflow-hidden w-[85vw] max-w-lg rounded-3xl hover:cursor-grab active:cursor-grabbing origin-bottom shadow-lg shadow-neutral-500/20 relative touch-none"
			drag
			dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
			dragElastic={0.7}
			dragTransition={{
				power: 0.3,
				timeConstant: 200,
			}}
			onDragEnd={handleDragEnd}
			style={{
				gridColumn: 1,
				gridRow: 1,
				opacity,
				pointerEvents: isFront ? "auto" : "none",
				rotate: rotate,
				scale: size,
				x,
				y,
				zIndex: 10 - index,
			}}
			whileTap={{ cursor: "grabbing" }}
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
