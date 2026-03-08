import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const letterVariants = {
  hidden: { y: "110%", rotate: 5, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.4 + i * 0.04,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const SplitText = ({ text, className }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <motion.span
          className="inline-block"
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </span>
    ))}
  </span>
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      {/* Animated grid pattern with parallax */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 opacity-[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="relative max-w-7xl mx-auto w-full">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8 md:mb-12"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-muted-foreground tracking-wide">
            Available for opportunities — Bangalore, India
          </span>
        </motion.div>

        {/* Main heading - letter by letter */}
        <div className="overflow-hidden mb-6">
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter uppercase">
            <SplitText text="AKSHATA" className="text-foreground" />
            <br />
            <SplitText text="HIREMANI" className="text-primary" />
          </h1>
        </div>

        {/* Subtitle with word reveal */}
        <motion.div className="max-w-xl mb-10 md:mb-16">
          <p className="text-lg md:text-xl leading-relaxed">
            {["Web Development &", "Computer Science student", "passionate about building", "practical applications and", "delivering impactful solutions."].map((line, i) => (
              <span key={i} className="inline-block overflow-hidden mr-1">
                <motion.span
                  className={`inline-block ${i === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}{" "}
                </motion.span>
              </span>
            ))}
          </p>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <MagneticButton
              as="a"
              href="#projects"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary text-primary font-semibold text-sm tracking-wide uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              strength={0.2}
            >
              VIEW PROJECTS
              <ArrowDown size={16} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
              strength={0.2}
            >
              GET IN TOUCH
            </MagneticButton>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "LinkedIn", url: "https://linkedin.com/in/akshata-hiremani" },
              { label: "GitHub", url: "https://github.com/akshata-hiremani" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 3 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 12, 0], scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
