import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export function RGBAurora({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rgb-aurora noise-overlay" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function FloatingRGBOrbs() {
  const colors = [
    "rgba(239, 68, 68, 0.2)",
    "rgba(16, 185, 129, 0.2)",
    "rgba(59, 130, 246, 0.2)",
    "rgba(168, 85, 247, 0.2)",
    "rgba(236, 72, 153, 0.2)",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: color,
            width: `${Math.random() * 400 + 200}px`,
            height: `${Math.random() * 400 + 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export function RGBTypingEffect({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className={`rgb-gradient-text font-mono ${className}`}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </div>
  );
}

export function ParticleField() {
  const particles = Array.from({ length: 50 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function RGBProgressBar({ 
  progress, 
  className = "" 
}: { 
  progress: number; 
  className?: string;
}) {
  return (
    <div className={`relative h-2 bg-muted rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: "linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #06b6d4, #3b82f6, #a855f7)",
          backgroundSize: "200% 100%",
        }}
        initial={{ width: 0 }}
        animate={{ 
          width: `${progress}%`,
          backgroundPosition: ["0% 50%", "200% 50%"],
        }}
        transition={{
          width: { duration: 1, ease: "easeOut" },
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
    </div>
  );
}

export function RGBSpinner({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        border: `3px solid transparent`,
        borderTop: "3px solid #3b82f6",
        borderRight: "3px solid #10b981",
        borderBottom: "3px solid #a855f7",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function WaveText({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) {
  const letters = text.split("");
  
  return (
    <div className={`flex ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="rgb-gradient-text inline-block"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
