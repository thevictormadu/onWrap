import React from 'react';
import {FrostedGlassProps} from '../types';
import {motion} from 'framer-motion';


const FloatedGlass: React.FC<FrostedGlassProps> = ({
                                                       children,
                                                       borderRadius = "16px",
                                                       blur = "50px",
                                                   }) => {
    return (
        <motion.div
            className={"frosted-glass"}
            style={{
                width: "100%",
                borderRadius,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: `blur(${blur})`,
                boxShadow: "inset 0 4px 100px rgba(8, 194, 241, 0.3), 0 3px 100px rgba(8, 194, 241, 0.6)",
                border: "1px solid rgba(8, 194, 241, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                zIndex: 10
            }}
            initial={{scale: 2, rotate: -10, opacity: 0}}
            animate={{scale: 1, rotate: 0, opacity: 1}}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
        >

            {children}
        </motion.div>
    );
};

export default FloatedGlass;