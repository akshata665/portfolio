import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

// Scroll-synchronized word component
const ScrollWord = ({
  word,
  progress,
  range
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number]
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(
    progress,
    range,
    ["hsl(0, 0%, 25%)", "hsl(0, 0%, 95%)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.25em] will-change-[opacity,color]"
    >
      {word}
    </motion.span>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "center 0.4"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const aboutText = "I'm a driven Computer Science undergraduate passionate about developing practical applications through hands-on projects, continuous learning, and delivering impactful solutions.";
  const words = aboutText.split(" ");

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-10 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax accent orb */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute -top-20 -left-40 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="section-label">(About)</span>
        </motion.div>

        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl text-balance">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <ScrollWord
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </h2>

        {/* Animated divider */}
        <div className="my-16 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent origin-left"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="section-label mb-4">(Education)</h3>
            <div className="space-y-6">
              {[
                {
                  title: "B.Tech – Information Science and Engineering",
                  place: "Dayananda Sagar College of Engineering, Bangalore",
                  date: "Jan 2026 – Present (Expected Graduation: 2027)",
                  highlight: false,
                },
                {
                  title: "Relevant Coursework",
                  place: "Data Structures, DBMS, OOP, AIML",
                  date: "CGPA: 9 / 10 (Till 5th sem)",
                  highlight: true,
                },
              ].map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                  className="group"
                >
                  <p className="text-foreground font-medium text-lg group-hover:text-primary transition-colors duration-300">
                    {edu.title}
                  </p>
                  <p className="text-muted-foreground">{edu.place}</p>
                  <p className={`text-sm mt-1 ${edu.highlight ? "text-primary" : "text-muted-foreground"}`}>
                    {edu.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="section-label mb-4">(Achievements & Activities)</h3>
            <div>
              <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                {[
                  "Selected as a finalist in the Smart India Hackathon 2025, competing in a national-level innovation challenge",
                  "Participated in a State-Level Ideathon 2025, contributing ideas and solutions to real-world problem statements",
                  "Participated in CMR Hackfest 2026, collaborating in a team-based hackathon to design technical solutions",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-2 group/item"
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  >
                    <motion.span
                      className="text-primary mt-1 shrink-0"
                      animate={isInView ? { rotate: [0, 90, 0] } : {}}
                      transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                    >
                      +
                    </motion.span>
                    <span className="group-hover/item:text-foreground transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
