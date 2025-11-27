"use client";

import { motion } from "framer-motion";

interface GradientBgProps {
  slideIndex?: number;
  gradient?: string;
  opacity?: number;
  animated?: boolean;
  type?: "linear" | "radial" | "mesh";
}

export default function GradientBg({
  gradient,
  animated = false,
}: GradientBgProps) {
  const getBackground = () => {
    if (gradient) return gradient;
  };

  const backgroundStyle = {
    position: "absolute" as const,
    inset: 0,
    background: getBackground(),
    zIndex: 0,
  };

  if (animated) {
    return (
      <motion.div
        style={backgroundStyle}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "linear",
        }}
      />
    );
  }

  return <div style={backgroundStyle} />;
}

