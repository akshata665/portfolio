import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "STEP 1",
    title: "Discovery\n& Research",
    description: "Understanding the problem space, analyzing data requirements, and defining technical scope for maximum impact.",
  },
  {
    step: "STEP 2",
    title: "Architecture\n& Design",
    description: "Building robust system architecture, designing APIs, and setting up data pipelines with security in mind.",
  },
  {
    step: "STEP 3",
    title: "Build\n& Iterate",
    description: "Developing core features, implementing ML models, and iterating based on testing and feedback.",
  },
  {
    step: "STEP 4",
    title: "Deploy\n& Optimize",
    description: "Deploying with confidence, monitoring performance, and continuously optimizing for better results.",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 md:py-36 px-6 md:px-10 bg-secondary/30 relative overflow-hidden" ref={ref}>
      {/* Background animated line */}
      <motion.div
        className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="section-label">(Process)</span>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-3xl md:text-5xl lg:text-6xl text-foreground"
          >
            HOW I WORK
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group perspective-[1000px]"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-700" />

                <div className="relative">
                  {/* Step number with animated dot */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-bold text-primary tracking-wider">{step.step}</span>
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={isInView ? {
                        scale: [0, 1.5, 1],
                        opacity: [0, 1, 1],
                      } : {}}
                      transition={{ delay: 0.6 + i * 0.2, duration: 0.5 }}
                    />
                  </div>

                  {/* Animated connector line (not on last) */}
                  {i < 3 && (
                    <motion.div
                      className="hidden lg:block absolute top-10 -right-6 w-6 h-px bg-border"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
                    />
                  )}

                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 whitespace-pre-line leading-tight group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
