import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeLeft, fadeRight, fadeUp, motionTransition } from '../lib/motion';

type Direction = 'left' | 'right' | 'up' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

const variantMap = {
  left: fadeLeft,
  right: fadeRight,
  up: fadeUp,
  none: fadeUp,
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={variantMap[direction]}
      transition={{ ...motionTransition(false, 0.65), delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
