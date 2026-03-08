import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Database, Cpu, ChevronDown } from "lucide-react";

const skills = [
  {
    number: "01",
    icon: Code2,
    title: "Programming Languages",
    description: "Building applications with modern programming languages and problem-solving skills.",
    items: ["Python", "C++", "Java (Basics)"],
  },
  {
    number: "02",
    icon: Database,
    title: "Database & Web",
    description: "Designing responsive web interfaces and managing structured data with relational databases.",
    items: ["MySQL", "HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    number: "03",
    icon: Cpu,
    title: "Tools & Platforms",
    description: "Leveraging modern development tools and design platforms for efficient workflows.",
    items: ["Git", "VS Code", "Figma", "AI Tools"],
  },
];

const SkillCard = ({
  skill,
  index,
  isInView,
}: {
  skill: (typeof skills)[0];
  index: number;
  isInView: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.12 }}
      className="group card-glow bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.005 }}
    >
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="flex items-center gap-4 md:min-w-[140px]">
            <motion.span
              className="font-display text-xl font-bold text-muted-foreground/40"
              animate={expanded ? { color: "hsl(12, 90%, 58%)" } : {}}
            >
              {skill.number}
            </motion.span>
            <motion.span
              className="text-primary"
              animate={expanded ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              .
            </motion.span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <skill.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{skill.description}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 md:px-10 pb-8 md:pb-10 md:pl-[200px]">
              <div className="flex flex-wrap gap-3">
                {skill.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: j * 0.06, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:border-primary/30 hover:bg-primary/10 transition-colors duration-300"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-36 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="section-label">(Services)</span>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-3xl md:text-5xl lg:text-6xl text-foreground"
          >
            HOW I CAN HELP
          </motion.h2>
        </div>

        <div className="space-y-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
