import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 3, suffix: "+", label: "Projects Built", prefix: "" },
  { value: 9, suffix: "", label: "CGPA (Till 5th sem)", prefix: "" },
  { value: 4, suffix: "", label: "Certifications Earned", prefix: "" },
  { value: 3, suffix: "+", label: "Hackathons Participated", prefix: "" },
];

const AnimatedNumber = ({ value, suffix, prefix, isInView }: { value: number; suffix: string; prefix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = value % 1 !== 0;
    const duration = 2000;
    const steps = 80;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.span
      className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground inline-block"
      initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
      animate={isInView ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-10 overflow-hidden" ref={sectionRef}>
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-secondary/30"
      />

      {/* Animated accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[120px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="section-label">(Why Me)</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-3xl md:text-5xl text-foreground mb-4"
          >
            NUMBERS DON'T LIE
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground max-w-xl mb-16"
        >
          Passionate about developing practical applications, continuous learning, and delivering impactful solutions through hands-on projects.
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              className="text-center md:text-left group"
              whileHover={{ y: -5 }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} isInView={isInView} />
              <motion.div
                className="h-px bg-primary/30 mt-3 mb-2 origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
              />
              <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
