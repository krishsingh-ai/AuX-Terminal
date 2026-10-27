export const snappyEase = [0.16, 1, 0.3, 1] as const;

export const pageMotionVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

export const pageMotionTransition = {
  duration: 0.25,
  ease: snappyEase,
};
