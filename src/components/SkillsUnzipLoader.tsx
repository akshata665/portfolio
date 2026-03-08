import { motion, useAnimate, stagger } from "framer-motion";
import { useEffect, useState } from "react";

interface SkillsUnzipLoaderProps {
    onComplete?: () => void;
    skills?: string[];
}

const defaultSkills = [
    "Python",
    "React",
    "TypeScript",
    "Flask",
    "FastAPI",
    "Data Analytics",
    "Machine Learning",
    "Cloud Computing",
];

const SkillsUnzipLoader = ({
    onComplete,
    skills = defaultSkills
}: SkillsUnzipLoaderProps) => {
    const [scope, animate] = useAnimate();
    const [isComplete, setIsComplete] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

    useEffect(() => {
        const runAnimation = async () => {
            // Initial state - everything hidden
            await animate(".zipper-line", { scaleY: 0, opacity: 0 }, { duration: 0 });
            await animate(".zipper-handle", { y: 0, opacity: 0 }, { duration: 0 });
            await animate(".skill-item", { opacity: 0, x: -20, filter: "blur(10px)" }, { duration: 0 });
            await animate(".left-panel", { x: 0 }, { duration: 0 });
            await animate(".right-panel", { x: 0 }, { duration: 0 });

            // Fade in the zipper line
            await animate(".zipper-line", { scaleY: 1, opacity: 1 }, { duration: 0.8, ease: "easeOut" });

            // Animate the zipper handle moving down
            await animate(
                ".zipper-handle",
                { opacity: 1 },
                { duration: 0.3 }
            );

            // Generate particles as zipper moves
            const newParticles: Array<{ id: number; x: number; y: number }> = [];
            for (let i = 0; i < 20; i++) {
                newParticles.push({
                    id: i,
                    x: (Math.random() - 0.5) * 100,
                    y: i * 25,
                });
            }
            setParticles(newParticles);

            // Animate zipper handle down while revealing skills
            await animate(
                ".zipper-handle",
                { y: 500 },
                { duration: 2, ease: [0.16, 1, 0.3, 1] }
            );

            // Reveal panels opening
            animate(".left-panel", { x: -20, opacity: 0.3 }, { duration: 0.8, ease: "easeOut" });
            animate(".right-panel", { x: 20, opacity: 0.3 }, { duration: 0.8, ease: "easeOut" });

            // Reveal skills with stagger
            await animate(
                ".skill-item",
                { opacity: 1, x: 0, filter: "blur(0px)" },
                { duration: 0.5, delay: stagger(0.12, { startDelay: 0.2 }) }
            );

            // Final pulse glow
            await animate(
                ".skills-container",
                {
                    boxShadow: [
                        "0 0 0px hsl(12, 90%, 58%)",
                        "0 0 60px hsl(12, 90%, 58%, 0.3)",
                        "0 0 20px hsl(12, 90%, 58%, 0.1)",
                    ]
                },
                { duration: 1.2, ease: "easeOut" }
            );

            setIsComplete(true);
            onComplete?.();
        };

        runAnimation();
    }, [animate, onComplete]);

    return (
        <div
            ref={scope}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden"
        >
            {/* Subtle background grid */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Ambient glow */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main container */}
            <div className="relative w-full max-w-2xl px-8">
                {/* Zipper panels */}
                <motion.div
                    className="left-panel absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-background to-transparent pointer-events-none"
                    style={{ originX: 1 }}
                />
                <motion.div
                    className="right-panel absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-background to-transparent pointer-events-none"
                    style={{ originX: 0 }}
                />

                {/* Zipper line */}
                <motion.div
                    className="zipper-line absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full origin-top"
                    style={{
                        background: "linear-gradient(to bottom, hsl(12, 90%, 58%) 0%, hsl(12, 90%, 58%, 0.5) 50%, transparent 100%)",
                    }}
                />

                {/* Zipper handle */}
                <motion.div
                    className="zipper-handle absolute left-1/2 -translate-x-1/2 top-0 z-10"
                >
                    <div className="relative">
                        {/* Glow effect */}
                        <motion.div
                            className="absolute -inset-4 rounded-full bg-primary/30 blur-xl"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        {/* Handle dot */}
                        <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_hsl(12,90%,58%,0.8)]" />
                    </div>
                </motion.div>

                {/* Floating particles */}
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 rounded-full bg-primary/60"
                        initial={{
                            left: "50%",
                            top: particle.y,
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            x: particle.x,
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            delay: particle.id * 0.1,
                            ease: "easeOut",
                        }}
                    />
                ))}

                {/* Skills container */}
                <div className="skills-container relative py-16 px-8 rounded-2xl">
                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
                            Skills Loading
                        </span>
                    </motion.div>

                    {/* Skills grid */}
                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                        {skills.map((skill, i) => (
                            <motion.div
                                key={skill}
                                className={`skill-item flex items-center gap-3 ${i % 2 === 0 ? 'justify-end text-right' : 'justify-start text-left'}`}
                            >
                                {i % 2 === 0 && (
                                    <span className="font-display text-lg md:text-xl font-bold text-foreground">
                                        {skill}
                                    </span>
                                )}
                                <motion.span
                                    className="w-2 h-2 rounded-full bg-primary shrink-0"
                                    animate={isComplete ? {
                                        boxShadow: [
                                            "0 0 0px hsl(12, 90%, 58%)",
                                            "0 0 10px hsl(12, 90%, 58%)",
                                            "0 0 0px hsl(12, 90%, 58%)",
                                        ],
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                />
                                {i % 2 !== 0 && (
                                    <span className="font-display text-lg md:text-xl font-bold text-foreground">
                                        {skill}
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Loading complete indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isComplete ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mt-12"
                    >
                        <motion.span
                            className="text-sm font-medium text-primary tracking-wider uppercase"
                            animate={isComplete ? {
                                opacity: [1, 0.5, 1],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Ready
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SkillsUnzipLoader;
