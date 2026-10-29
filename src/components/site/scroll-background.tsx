import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface ScrollBackgroundProps {
  children: ReactNode;
}

export function ScrollBackground({ children }: ScrollBackgroundProps) {
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to background color
  // Starts at dark color, transitions to #E3F2FD as you scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    ["#0a0e1a", "#1a2538", "#E3F2FD"]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="min-h-screen transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
}

export function SmoothScrollBackground({ children }: ScrollBackgroundProps) {
  const { scrollYProgress } = useScroll();

  // Smoother transition with more control points
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 1],
    [
      "#0a0e1a", // Dark navy at top
      "#0f1624", // Slightly lighter
      "#1a2840", // Medium dark blue
      "#3d5a80", // Mid blue
      "#90CAF9", // Light blue
      "#E3F2FD", // Very light blue at bottom
    ]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export function GradientScrollBackground({ children }: ScrollBackgroundProps) {
  const { scrollYProgress } = useScroll();

  // Create gradient that changes with scroll
  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(180deg, #0a0e1a 0%, #131827 100%)",
      "linear-gradient(180deg, #1a2840 0%, #90CAF9 100%)",
      "linear-gradient(180deg, #90CAF9 0%, #E3F2FD 100%)",
    ]
  );

  return (
    <motion.div
      style={{ background }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export function SectionBasedScrollBackground({ children }: ScrollBackgroundProps) {
  const { scrollY } = useScroll();

  // Change background based on scroll position (in pixels)
  const backgroundColor = useTransform(
    scrollY,
    [0, 500, 1000, 2000, 3000],
    [
      "#0a0e1a", // Section 1 - Dark
      "#1a2840", // Section 2 - Dark blue
      "#3d5a80", // Section 3 - Medium blue
      "#90CAF9", // Section 4 - Light blue
      "#E3F2FD", // Section 5 - Very light blue
    ]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="min-h-screen transition-colors"
    >
      {children}
    </motion.div>
  );
}

// Text color that adapts based on background
export function AdaptiveTextColor({ children }: ScrollBackgroundProps) {
  const { scrollYProgress } = useScroll();

  // Text color transitions from light to dark as background lightens
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#f5f7fa", "#2d3748", "#1a202c"]
  );

  return (
    <motion.div
      style={{ color: textColor }}
      className="transition-colors"
    >
      {children}
    </motion.div>
  );
}

// Combined background and text transition
export function SmartScrollBackground({ children }: ScrollBackgroundProps) {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      "#0a0e1a",
      "#1a2840",
      "#3d5a80",
      "#90CAF9",
      "#E3F2FD",
    ]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [
      "#f5f7fa", // Light text on dark bg
      "#e2e8f0", // Still light
      "#2d3748", // Getting darker
      "#1a202c", // Dark text on light bg
    ]
  );

  return (
    <motion.div
      style={{ backgroundColor, color: textColor }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
