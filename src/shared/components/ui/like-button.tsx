import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "./button";
import { Tooltip } from "./tooltip";

const CircleAnimation = () => {
  const CIRCLE_RADIUS = 20;

  return (
    <svg
      className="pointer-events-none absolute -top-3 -left-3"
      style={{
        height: CIRCLE_RADIUS * 2,
        width: CIRCLE_RADIUS * 2,
      }}
    >
      <title>Like animation circle</title>
      <motion.circle
        animate={{
          scale: 1,
          stroke: "#CC8EF5",
          strokeWidth: 0,
        }}
        cx={CIRCLE_RADIUS}
        cy={CIRCLE_RADIUS}
        fill="none"
        initial={{
          scale: 0,
          stroke: "#E5214A",
          strokeWidth: CIRCLE_RADIUS * 2,
        }}
        r={CIRCLE_RADIUS - 2}
        transition={{
          duration: 0.4,
          ease: [0.33, 1, 0.68, 1], // cubic-out
        }}
      />
    </svg>
  );
};

// Burst animation with particles
const BurstAnimation = () => {
  // Colors for particles with from/to transitions
  const colorPairs = [
    { from: "#9EC9F5", to: "#9ED8C6" },
    { from: "#91D3F7", to: "#9AE4CF" },
    { from: "#DC93CF", to: "#E3D36B" },
    { from: "#CF8EEF", to: "#CBEB98" },
    { from: "#87E9C6", to: "#1FCC93" },
    { from: "#A7ECD0", to: "#9AE4CF" },
    { from: "#87E9C6", to: "#A635D9" },
    { from: "#D58EB3", to: "#E0B6F5" },
    { from: "#F48BA2", to: "#CF8EEF" },
    { from: "#91D3F7", to: "#A635D9" },
    { from: "#CF8EEF", to: "#CBEB98" },
    { from: "#87E9C6", to: "#A635D9" },
    { from: "#9EC9F5", to: "#9ED8C6" },
    { from: "#91D3F7", to: "#9AE4CF" },
  ];

  return (
    <div className="pointer-events-none absolute -top-3 -left-3 grid size-10 place-items-center">
      {colorPairs.map((colors, index) => (
        <Particle
          fromColor={colors.from}
          index={index}
          // biome-ignore lint/suspicious/noArrayIndexKey:  acceptable in this static case
          key={index}
          toColor={colors.to}
          totalParticles={colorPairs.length}
        />
      ))}
    </div>
  );
};

const BURST_RADIUS = 32;
const START_RADIUS = 4;
const PATH_SCALE_FACTOR = 0.8;

// Particle component for burst animation
const Particle = ({
  fromColor,
  toColor,
  index,
  totalParticles,
}: {
  fromColor: string;
  toColor: string;
  index: number;
  totalParticles: number;
}) => {
  // Calculate angle based on index with 45 degree offset
  const angle = (index / totalParticles) * 360 + 45;
  const radians = (angle * Math.PI) / 180;

  // Add randomness to the burst distance (±15%)
  const randomFactor = 0.85 + Math.random() * 0.3;
  const burstDistance = BURST_RADIUS * randomFactor;

  // Randomize duration between 500-700ms
  const duration = 500 + Math.random() * 200;

  // Calculate the degree shift (13 degrees in radians)
  const degreeShift = (13 * Math.PI) / 180;

  return (
    <motion.div
      animate={{
        backgroundColor: toColor,
        opacity: [0, 1, 1, 0],
        scale: 0,
        x: Math.cos(radians + degreeShift) * burstDistance * PATH_SCALE_FACTOR,
        y: Math.sin(radians + degreeShift) * burstDistance * PATH_SCALE_FACTOR,
      }}
      className="pointer-events-none absolute size-1.5 rounded-full"
      initial={{
        backgroundColor: fromColor,
        opacity: 0,
        scale: 1,
        x: Math.cos(radians) * START_RADIUS * PATH_SCALE_FACTOR,
        y: Math.sin(radians) * START_RADIUS * PATH_SCALE_FACTOR,
      }}
      style={{ backgroundColor: fromColor, opacity: 0 }}
      transition={{
        backgroundColor: {
          delay: 0.3,
          duration: duration / 1000,
        },
        opacity: {
          delay: 0.4,
          duration: duration / 1000,
          times: [0, 0.01, 0.99, 1],
        },
        scale: {
          delay: 0.3,
          duration: duration / 1000,
          ease: [0.55, 0.085, 0.68, 0.53], // quad.in for scaling
        },
        x: {
          delay: 0.3,
          duration: duration / 1000,
          ease: [0.23, 1, 0.32, 1], // quint.out for movement
        },
        y: {
          delay: 0.3,
          duration: duration / 1000,
          ease: [0.23, 1, 0.32, 1], // quint.out for movement
        },
      }}
    />
  );
};

interface LikeButtonProps {
  isLiked?: boolean;
  onToggle?: () => void;
}

export const LikeButton = ({
  isLiked: externalIsLiked = false,
  onToggle,
}: LikeButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const iconButtonRef = useRef<null | HTMLButtonElement>(null);

  const toggleLike = () => {
    if (onToggle) {
      onToggle();
      if (!externalIsLiked) {
        setIsAnimating(true);
      }
    }
  };

  return (
    <Tooltip
      label={externalIsLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Button
        aria-label={
          externalIsLiked ? "Quitar de favoritos" : "Agregar a favoritos"
        }
        onClick={toggleLike}
        ref={iconButtonRef}
        size={"icon"}
        type="button"
        variant={"ghost"}
      >
        <div className="relative">
          {isAnimating && <CircleAnimation />}
          {isAnimating && <BurstAnimation />}
          {isAnimating ? (
            <motion.svg
              animate={{ scale: 1 }}
              className="text-red-500"
              fill="currentColor"
              height="16"
              initial={{ scale: 0 }}
              key="animating-heart"
              onAnimationComplete={() => setIsAnimating(false)}
              stroke="currentColor"
              transition={{
                damping: 10,
                delay: 0.3,
                stiffness: 300,
                type: "spring",
              }}
              viewBox="0 0 24 24"
              width="16"
            >
              <title>Liked</title>
              <path d="m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z" />
            </motion.svg>
          ) : (
            <svg
              className={`${externalIsLiked ? "text-red-500" : "text-inherit"}`}
              fill="currentColor"
              height="16"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="16"
            >
              <title>{externalIsLiked ? "Liked" : "Not liked"}</title>
              <path d="m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z" />
            </svg>
          )}
        </div>
      </Button>
    </Tooltip>
  );
};
