import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
    text: string;
    className?: string;
}

const ScrollTextReveal = ({ text, className = "" }: ScrollTextRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = text.split(" ");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.4"],
    });

    return (
        <section
            ref={containerRef}
            className={`min-h-[80vh] flex items-center justify-center bg-background px-6 md:px-12 py-24 ${className}`}
        >
            <div className="max-w-5xl mx-auto">
                <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-display">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = (i + 1) / words.length;

                        return (
                            <Word
                                key={i}
                                word={word}
                                progress={scrollYProgress}
                                range={[start, end]}
                            />
                        );
                    })}
                </p>
            </div>
        </section>
    );
};

interface WordProps {
    word: string;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
    range: [number, number];
}

const Word = ({ word, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    const color = useTransform(
        progress,
        range,
        ["hsl(0, 0%, 30%)", "hsl(0, 0%, 100%)"]
    );

    return (
        <motion.span
            style={{ opacity, color }}
            className="inline-block mr-[0.25em] will-change-[opacity,color] transition-none"
        >
            {word}
        </motion.span>
    );
};

export default ScrollTextReveal;
