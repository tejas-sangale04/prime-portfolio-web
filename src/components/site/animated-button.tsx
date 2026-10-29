import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useState } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "rgb";
}

export function AnimatedButton({ 
  children, 
  onClick, 
  className = "",
  variant = "primary"
}: AnimatedButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    rgb: "rgb-border bg-card text-foreground"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all ${variants[variant]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        y: -5,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

export function RGBButton({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: ReactNode; 
  onClick?: () => void;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white ${className}`}
      whileHover={{ 
        scale: 1.08,
        y: -5,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #06b6d4, #3b82f6, #a855f7, #ec4899)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 50%", "200% 50%"] : "0% 50%",
        }}
        transition={{
          duration: isHovered ? 1.5 : 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0, 0.5, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
        }}
      />
      <motion.span
        className="relative z-10"
        animate={{
          scale: isHovered ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

export function GlowButton({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: ReactNode; 
  onClick?: () => void;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.08,
        y: -8,
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        boxShadow: [
          "0 0 20px rgba(59, 130, 246, 0.3), 0 10px 40px rgba(0, 0, 0, 0.2)",
          "0 0 30px rgba(16, 185, 129, 0.4), 0 15px 50px rgba(0, 0, 0, 0.3)",
          "0 0 20px rgba(168, 85, 247, 0.3), 0 10px 40px rgba(0, 0, 0, 0.2)",
          "0 0 20px rgba(59, 130, 246, 0.3), 0 10px 40px rgba(0, 0, 0, 0.2)",
        ],
      }}
      transition={{
        boxShadow: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        className="absolute inset-0 shine"
        animate={{
          x: isHovered ? ["-100%", "200%"] : "-100%",
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      />
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: isHovered
            ? [
                "0 0 10px rgba(255, 255, 255, 0.5)",
                "0 0 20px rgba(255, 255, 255, 0.8)",
                "0 0 10px rgba(255, 255, 255, 0.5)",
              ]
            : "0 0 0px rgba(255, 255, 255, 0)",
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

export function PulseButton({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: ReactNode; 
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground ${className}`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-primary"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl bg-primary"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function MagneticButton({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: ReactNode; 
  onClick?: () => void;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useTransform(mouseX, [-100, 100], [-20, 20]);
  const y = useTransform(mouseY, [-100, 100], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 rounded-xl font-semibold rgb-border bg-card text-foreground ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}

export function LiquidButton({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: ReactNode; 
  onClick?: () => void;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-rgb-blue via-rgb-purple to-rgb-pink"
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <div className="absolute inset-0 bg-primary" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
