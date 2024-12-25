import {motion} from "framer-motion";

interface Props {
    title: string;
    data: string;
    glowColor?: string;
    delay?: number;
}

export default function EndNoteCard({
                                        title,
                                        data,
                                        glowColor = "8, 194, 241",
                                        delay = 0.3
                                    }: Props) {
    return (
        <motion.div
            style={{
                borderRadius: "0.5rem",
                padding: "1rem",
                width: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: `blur(5px)`,
                boxShadow: `0 3px 100px rgba(${glowColor}, 0.1)`,
                border: `1px solid rgba(${glowColor}, 0.1)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                overflow: "hidden",
                zIndex: 10,
            }}
            initial={{y: 50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: delay,
            }}
        >
            <div style={{color: "white", textAlign: "left"}}>
                <p style={{whiteSpace: "nowrap"}}>{title}</p>
                <p style={{fontSize: "2rem", fontWeight: "bold", marginTop: 10, color: `rgba(${glowColor})`}}>{data}</p>
            </div>
        </motion.div>
    );
};