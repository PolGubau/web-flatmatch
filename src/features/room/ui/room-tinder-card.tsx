import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { Room, RoomWithMetadata } from "~/entities/room/room";
import { useHapticFeedback } from "~/shared/hooks/use-haptic-feedback";
import { logger } from "~/shared/utils/logger";
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

	// Log para debugging en iOS
	useEffect(() => {
		logger.info("RoomTinderCard mounted", {
			index,
			isFront,
			roomId: room.id,
		});
	}, [index, isFront, room.id]);

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

	// Calcular el offset estático basado en el índice (evita usar .get() que causa problemas en iOS)
	const amount = 2;
	const staticOffset = isFront ? 0 : index % 2 === 0 ? -amount : amount;

	// Usar useTransform con valores estáticos en lugar de callback con .get()
	const rotate = useTransform(
		rotateRaw,
		(value) => `${value + staticOffset}deg`,
	);

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
		try {
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
				// For vertical swipes we only want to show a short 'peek' and then
				// return the card to the center, because "up" opens details (doesn't
				// remove the card) and "down" currently doesn't remove it either.
				const direction = info.offset.y > 0 ? "down" : "up";

				triggerHaptic("heavy");

				// Small quick translation to give feedback, then spring back to center.
				const peek = direction === "down" ? 180 : -180;
				animate(y, peek, {
					duration: 0.12,
					ease: "easeOut",
				});

				setTimeout(() => {
					// Return to center smoothly
					animate(y, 0, {
						damping: 30,
						stiffness: 300,
						type: "spring",
					});

					// Trigger the action (e.g. open details for "up") after the peek
					onSwipe(room.id, direction);
				}, 140);
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
		} catch (error) {
			logger.error("Error in handleDragEnd (iOS Safari issue?)", error);
			// Fallback: reset card position
			hasTriggeredHaptic.current = false;
			try {
				animate(x, 0, { duration: 0.3 });
				animate(y, 0, { duration: 0.3 });
			} catch (animateError) {
				logger.error("Error resetting card position", animateError);
			}
		}
	};

	return (
		<motion.div
			className="h-full bg-foreground/10 backdrop-blur-md overflow-hidden w-[90vw] max-w-lg rounded-2xl md:rounded-3xl hover:cursor-grab active:cursor-grabbing origin-bottom shadow-lg shadow-foreground/10 relative touch-none"
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
				className="absolute top-1/2 left-8 -translate-y-1/2 z-50 pointer-events-none text-8xl select-none"
				style={{
					opacity: likeEmojiOpacity,
					scale: likeEmojiScale,
				}}
			>
				💚
			</motion.div>

			{/* Dislike emoji (left swipe) */}
			<motion.div
				className="absolute top-1/2 right-8 -translate-y-1/2 z-50 pointer-events-none text-8xl select-none"
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
