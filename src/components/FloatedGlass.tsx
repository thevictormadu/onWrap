import React from 'react';
import { FrostedGlassProps } from '../types';
import { motion } from 'framer-motion';



const FloatedGlass: React.FC<FrostedGlassProps> = ({
                                                       children,
                                                       width,
                                                       maxWidth = "350px",
                                                       borderRadius = "16px",
                                                       blur = "50px",
                                                       padding = "2rem",
    margin = "0",
                                                   }) => {
    return (
        <motion.div
            className={"frosted-glass"}
            style={{
                width: width || "auto",
                maxWidth,
                padding,
                borderRadius,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: `blur(${blur})`,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: margin,
                position: "relative",
                overflow: "hidden",
            }}
            animate={{
                y: [0, -20, 0], // Float up and down
                rotateX: [-15, 0, -15], // Perspective rotation on X-axis
                boxShadow: [
                    "0px 0px 5px 2px rgba(52, 152, 219, 0.1)", // Glow starts
                    "0px 0px 5px 3px rgba(52, 152, 219, 0.3)", // Brighter glow
                    "0px 0px 5px 2px rgba(52, 152, 219, 0.1)", // Glow dims back
                ],
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >

            {children}
        </motion.div>
    );
};

export default FloatedGlass;