import { useState } from "react";
import SkillsUnzipLoader from "@/components/SkillsUnzipLoader";

const SkillsDemo = () => {
    const [showLoader, setShowLoader] = useState(true);

    const customSkills = [
        "Python",
        "React",
        "TypeScript",
        "FastAPI",
        "Data Analytics",
        "Machine Learning",
        "Cloud (OCI)",
        "Docker",
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {showLoader && (
                <SkillsUnzipLoader
                    skills={customSkills}
                    onComplete={() => {
                        // Optional: auto-hide after animation
                        setTimeout(() => setShowLoader(false), 2000);
                    }}
                />
            )}

            {!showLoader && (
                <div className="flex items-center justify-center min-h-screen">
                    <button
                        onClick={() => setShowLoader(true)}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                        Replay Animation
                    </button>
                </div>
            )}
        </div>
    );
};

export default SkillsDemo;
