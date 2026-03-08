import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const certifications = [
  {
    title: "Database Management Systems (DBMS)",
    issuer: "Infosys Springboard — Feb 2025",
  },
  {
    title: "Smart India Hackathon — Participant",
    issuer: "Sep 2025",
  },
  {
    title: "State-Level Ideathon — Participant",
    issuer: "Nov 2025",
  },
  {
    title: "CMR Hackfest — Participant",
    issuer: "Jan 2026",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="section-label">(Certifications)</span>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-3xl md:text-5xl text-foreground"
          >
            CREDENTIALS
          </motion.h2>
        </div>

        <div className="space-y-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="group flex items-start gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-500 cursor-default"
            >
              <motion.div
                className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Award size={20} />
              </motion.div>
              <div>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
