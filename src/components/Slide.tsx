import React from "react";
import { motion } from "framer-motion";
import {SlideProps} from "../types.ts";

const Slide: React.FC<SlideProps> = ({ heading, body, emojis, background }) => {
    return (
        <div
            style={{
                height: "100vh",
                position: "relative",
                background,
                overflow: "hidden",
            }}
        >
            {/* Floating Emojis */}
            {emojis.map((emoji, idx) => (
                <motion.div
                    key={idx}
                    initial={{ y: emoji.initialY, x: emoji.initialX }}
                    animate={{ y: [emoji.initialY - 20, emoji.initialY + 20, emoji.initialY - 20] }}
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
                        textShadow: { duration: 2, repeat: Infinity, repeatType: "mirror" },
                        translateY: { duration: 4, repeat: Infinity, repeatType: "mirror" },
                    }}
                    style={{ fontSize: "3rem", fontWeight: "bold" }}
                >
                    {heading}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ fontSize: "1.5rem" }}
                >
                    {body}
                </motion.p>
            </div>
        </div>
    );
};

export default Slide;