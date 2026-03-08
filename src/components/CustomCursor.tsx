import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isTouch = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 350, mass: 0.5 };
  const trailConfig = { damping: 30, stiffness: 150, mass: 0.8 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    // Detect touch devices
    const checkTouch = () => { isTouch.current = true; };
    window.addEventListener("touchstart", checkTouch, { once: true });

    const move = (e: MouseEvent) => {
      if (isTouch.current) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setVisible(false);
    const enter = () => { if (!isTouch.current) setVisible(true); };

    const handleHoverables = () => {
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .card-glow, .hover-lift'
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    // Observe DOM for dynamically added elements
    handleHoverables();
    const observer = new MutationObserver(handleHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, visible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ cursor: "none" }}
    >
      {/* Outer glow trail */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 60 : 36,
          height: hovered ? 60 : 36,
          background: "radial-gradient(circle, hsl(12 90% 58% / 0.12), hsl(12 90% 58% / 0.04), transparent 70%)",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      />

      {/* Mid ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          borderColor: hovered
            ? "hsl(12 90% 58% / 0.4)"
            : "hsl(12 90% 58% / 0.15)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
        animate={{
          scale: clicked ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      />

      {/* Core dot */}
      <motion.div
        className="absolute rounded-full bg-primary"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clicked ? 5 : hovered ? 6 : 7,
          height: clicked ? 5 : hovered ? 6 : 7,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />
    </div>
  );
};

export default CustomCursor;
