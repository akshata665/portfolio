import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.span
          className="font-display font-bold text-sm tracking-tight text-foreground"
          whileHover={{ scale: 1.05 }}
        >
          AKSHATA<span className="text-primary">.</span>
        </motion.span>

        <div className="flex items-center gap-6">
          {[
            { label: "LinkedIn", url: "https://linkedin.com/in/akshata-hiremani" },
            { label: "GitHub", url: "https://github.com/akshata-hiremani" },
            { label: "Email", url: "mailto:hiremaniakshata09@gmail.com" },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
