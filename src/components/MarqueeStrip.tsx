import { motion } from "framer-motion";

const items = [
  "PYTHON", "•", "C++", "•", "JAVA", "•", "HTML", "•",
  "CSS", "•", "JAVASCRIPT", "•", "REACT.JS", "•", "MYSQL", "•",
  "GIT", "•", "VS CODE", "•", "FIGMA", "•", "WEB DEVELOPMENT", "•",
];

const MarqueeStrip = () => {
  return (
    <div className="relative overflow-hidden py-6 md:py-8 border-y border-border bg-card/50">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`mx-4 md:mx-6 font-display text-lg md:text-2xl font-bold tracking-wider ${item === "•" ? "text-primary" : "text-muted-foreground/40"
              }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
