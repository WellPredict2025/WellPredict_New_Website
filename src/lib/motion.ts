import type { Transition, Variants } from 'motion/react';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const dropdownPanel: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
};

export const mobileMenuPanel: Variants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%' },
};

export const slideFade: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 32 : -32,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -32 : 32,
  }),
};

export function motionTransition(shouldReduceMotion: boolean | null, duration = 0.45): Transition {
  return shouldReduceMotion
    ? { duration: 0 }
    : { duration, ease: [0.22, 1, 0.36, 1] };
}
