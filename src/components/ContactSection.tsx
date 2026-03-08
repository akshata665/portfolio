import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import MagneticButton from "./MagneticButton";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]);
  const orbX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-10 bg-secondary/30 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Parallax orbs */}
      <motion.div
        style={{ scale: orbScale, x: orbX }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ scale: orbScale }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.span
            className="section-label mb-6 block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            (Contact)
          </motion.span>

          {/* Big text reveal */}
          <div className="overflow-hidden mb-2">
            <motion.span
              className="section-heading text-4xl md:text-6xl lg:text-8xl text-foreground block"
              initial={{ y: "120%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              LET'S WORK
            </motion.span>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.span
              className="section-heading text-4xl md:text-6xl lg:text-8xl text-primary block"
              initial={{ y: "120%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              TOGETHER
            </motion.span>
          </div>

          <motion.p
            className="text-muted-foreground text-lg max-w-lg mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Have a project in mind or looking for a dedicated developer? I'd love to hear about it. Let's build something great!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
          >
            <MagneticButton
              as="a"
              href="mailto:hiremaniakshata09@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
              strength={0.25}
            >
              GET IN TOUCH
              <ArrowUpRight size={18} />
            </MagneticButton>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground">
            {[
              { icon: Mail, text: "hiremaniakshata09@gmail.com", href: "mailto:hiremaniakshata09@gmail.com" },
              { icon: Phone, text: "+91 8088640622", href: "tel:+918088640622" },
            ].map((contact, i) => (
              <motion.a
                key={contact.text}
                href={contact.href}
                className="flex items-center gap-2 hover:text-primary transition-colors duration-300 group"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <motion.div whileHover={{ rotate: 15 }}>
                  <contact.icon size={16} />
                </motion.div>
                <span className="text-sm">{contact.text}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
