import type { Room } from "~/entities/room/room";
import { motion, useMotionValue, useTransform } from "motion/react";
import type { SwipeDirection } from "../types/common";
import { RoomTinderCardUI } from "./room-tinder-card-ui";

type RoomTinderCardProps = {
  room: Room;
  onSwipe: (roomId: Room["id"], direction: SwipeDirection) => void;
  index: number;

}
export const RoomTinderCard = ({ room, onSwipe, index }: RoomTinderCardProps) => {

  const isFront = index === 0;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotateRaw = useTransform(x, [-150, 150], [-10, 10]);
  const size = useTransform(x, [-150, 0, 150], [0.9, 1, 0.9]);
  const colorOverlay = useTransform(x, [-200, 0, 200], ["#ff0000", "#ffffff00", "#0000ff"])

  const rotate = useTransform(() => {
    const amount = 2
    const offset = isFront ? 0 : index % 2 === 0 ? -amount : amount;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: { offset: { x: number; y: number } }) => {
    if (Math.abs(info.offset.x) > 150) {
      onSwipe(room.id, info.offset.x > 0 ? "right" : "left");
    }
  }

  return (<motion.div className="h-[60vh] bg-neutral-500 overflow-hidden w-[80vw] max-w-[500px] rounded-3xl hover:cursor-grab active:cursor-grabbing origin-bottom shadow shadow-neutral-500/10 relative"
    drag
    dragElastic={0.2}
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    style={{
      gridRow: 1,
      gridColumn: 1,
      x,
      opacity,
      rotate: rotate,
      scale: size,
      transition: "0.125s transform",
      zIndex: 1000 - index,
      pointerEvents: isFront ? "auto" : "none", // la de arriba es la interactiva

    }}
    onDragEnd={handleDragEnd}>
    <motion.div className="absolute inset-0 w-full h-full z-10" style={{
      backgroundColor: colorOverlay
    }} />
    <RoomTinderCardUI room={room} />

  </motion.div>)
}