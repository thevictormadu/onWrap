import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  flex?: number | string;
  flexDirection?: "row" | "column";
  gap?: string;
  padding?: string;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  delay?: number;
  initial?: { opacity?: number; scale?: number; y?: number };
  animate?: { opacity?: number; scale?: number; y?: number };
  transition?: { duration?: number; delay?: number };
  style?: CSSProperties;
}

export default function Card({
  children,
  flex = 1,
  flexDirection = "column",
  gap = "0.5rem",
  padding = "1.25rem",
  overflow = "visible",
  alignItems,
  justifyContent,
  delay = 0,
  initial = { opacity: 0, scale: 0.9 },
  animate = { opacity: 1, scale: 1 },
  transition = { duration: 0.6, delay },
  style,
}: CardProps) {
  return (
    <motion.div
      style={{
        flex: flex,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.75rem",
        padding: padding,
        display: "flex",
        flexDirection: flexDirection,
        gap: gap,
        overflow: overflow,
        ...(alignItems && { alignItems }),
        ...(justifyContent && { justifyContent }),
        ...style,
      }}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
