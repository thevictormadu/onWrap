import React from "react";
import { FrostedGlassProps } from "../types";
import { motion } from "framer-motion";

const FloatedGlass: React.FC<FrostedGlassProps> = ({
  children,
  borderRadius = "16px",
}) => {
  return (
    <motion.div
      style={{
        width: "100%",
        borderRadius,
        backgroundColor: "#0D2932",
        boxShadow: "0 3px 100px rgba(8, 194, 241, 0.4)",
        border: "1px solid #104D5E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        zIndex: 10,
      }}
      initial={{ scale: 2, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
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
