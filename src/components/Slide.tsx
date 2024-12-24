import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideProps } from "../types.ts";
import githubLogo from "../assets/github-logo.png";
import FrostedGlass from "./FrostedGlass.tsx";

const Slide: React.FC<SlideProps> = ({
                                         data,
                                         subText,
                                         preText,
                                         title,
                                         emojis,
                                         background = `
          linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
          linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
        `,
                                         keyProp, // Unique key for each slide
                                     }) => {
    const [showPretext, setShowPretext] = useState(true);

    useEffect(() => {
        // Reset pretext visibility when the slide changes
        setShowPretext(true);
        console.log(showPretext);
        const timer = setTimeout(() => {
            setShowPretext(false);
        }, 2000); // 2 seconds
        return () => clearTimeout(timer);
    }, [keyProp]); // Re-run effect when the slide changes

    return (
        <div
            key={keyProp} // Ensure the unique key is applied here
            style={{
                height: "100vh",
                position: "relative",
                background: background,
                overflow: "hidden",
                backgroundSize: "20px 20px",
                animation: "moveMesh 5s linear infinite",
            }}
        >
            {/* Floating Emojis */}
            {emojis.map((emoji, idx) => (
                <motion.div
                    key={idx}
                    initial={{ y: emoji.initialY, x: emoji.initialX }}
                    animate={{
                        y: [emoji.initialY - 20, emoji.initialY + 20, emoji.initialY - 20],
                    }}
                    transition={{
                        duration: emoji.duration,
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                    style={{
                        position: "absolute",
                        top: `${emoji.initialY}%`,
                        left: `${emoji.initialX}%`,
                        fontSize: `${emoji.size}rem`,
                        opacity: emoji.opacity,
                        filter: `blur(${emoji.blur}px)`,
                        color: emoji.color || "#fff",
                        zIndex: emoji.zIndex || 10,
                    }}
                >
                    {emoji.content}
                </motion.div>
            ))}

            {/* Foreground Content */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "#08C2F1",
                    zIndex: 20,
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <FrostedGlass
                        margin={"4rem 0 0 0"}
                        padding={"0.5rem 1rem"}
                        blur={"02px"}
                    >
                        <div style={{ color: "white", fontSize: "1.3rem" }}>{title}</div>
                    </FrostedGlass>

                    {showPretext ? (
                        <motion.p
                            className="pretext"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1 }}
                            style={{ fontSize: "1.5rem", padding: "2rem" }}
                        >
                            {preText}
                        </motion.p>
                    ) : (
                        <div
                            className="metric"
                            style={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 50 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    textShadow: [
                                        "0 0 10px rgba(255, 255, 255, 0.8)",
                                        "0 0 20px rgba(255, 255, 255, 0.5)",
                                        "0 0 30px rgba(255, 255, 255, 0.8)",
                                    ],
                                    translateY: [0, -10, 0],
                                }}
                                transition={{
                                    opacity: { duration: 1 },
                                    textShadow: {
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                    },
                                    translateY: { duration: 4, repeat: Infinity, repeatType: "mirror" },
                                }}
                                style={{
                                    fontSize: "4rem",
                                    fontWeight: "bold",
                                    margin: "1rem",
                                    padding: "0 2rem",
                                }}
                            >
                                {data}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                style={{ fontSize: "1.5rem", padding: "0 2rem" }}
                            >
                                {subText}
                            </motion.p>
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 5,
                            marginBottom: "120px",
                        }}
                    >
                        <img style={{ width: "1.5rem" }} src={githubLogo} alt="GitHub Logo" />
                        <p style={{ opacity: 0.8 }}>#GitHubOnWrap</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;