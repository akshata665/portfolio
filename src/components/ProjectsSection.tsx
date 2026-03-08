import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "HOSPITAL MGMT",
    subtitle: "Hospital Management System",
    description:
      "Developed a web-based interface to manage patient records and appointment scheduling. Designed responsive UI forms for patient registration and hospital administration.",
    tech: ["HTML", "CSS", "JavaScript", "Python", "MySQL"],
  },
  {
    number: "02",
    title: "JADOO TRAVEL",
    subtitle: "Travel Website Interface",
    description:
      "Built a modern travel website UI with responsive layouts and destination sections. Implemented clean navigation and reusable UI components for improved user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    number: "03",
    title: "DEV PORTFOLIO",
    subtitle: "Developer Portfolio Website",
    description:
      "Created a personal developer portfolio to showcase projects, skills, and achievements. Designed a responsive layout with project sections and contact integration.",
    tech: ["React.js", "JavaScript", "HTML", "CSS"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-36 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-4 block"
            >
              (Projects)
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading text-4xl md:text-6xl lg:text-7xl text-foreground"
              >
                Latest
                <br />
                Work
              </motion.h2>
            </div>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="section-label hidden md:block mt-2"
          >
            (03)
          </motion.span>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(x * 3);
    rotateX.set(-y * 3);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.2 + index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group card-glow bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/30 transition-colors duration-500 cursor-pointer"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
        {/* Number with glow effect */}
        <motion.span
          className="font-display text-5xl md:text-7xl font-bold text-muted-foreground/20 group-hover:text-primary/40 transition-colors duration-700"
          whileHover={{ scale: 1.1 }}
        >
          {project.number}
        </motion.span>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.h3
                className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                layout
              >
                {project.title}
              </motion.h3>
              <p className="text-muted-foreground mt-1">{project.subtitle}</p>
            </div>
            <motion.div
              className="p-3 rounded-full border border-border group-hover:border-primary group-hover:bg-primary transition-all duration-300"
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowUpRight
                size={18}
                className="text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300"
              />
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, j) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.2 + j * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
