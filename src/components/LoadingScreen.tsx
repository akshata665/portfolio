import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));

      if (pct < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.span
            className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AKSHATA<span className="text-primary">.</span>
          </motion.span>

          {/* Progress number */}
          <motion.span
            className="font-display text-6xl md:text-8xl font-bold text-primary tabular-nums"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {progress}
          </motion.span>

          {/* Progress bar */}
          <div className="w-48 md:w-64 h-px bg-border relative overflow-hidden mt-8">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status text */}
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {progress < 100 ? "Loading" : "Ready"}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
