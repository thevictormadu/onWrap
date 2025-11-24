import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatedGlass from "./FloatedGlass.tsx";
import {
  PRETEXT_DISPLAY_DURATION,
  COUNTDOWN_ANIMATION_DURATION,
} from "../constants/ui.ts";
import { getSlideColor } from "../utils/gradients.ts";
import { getTextGradient } from "../constants/colors.ts";

export interface SlideProps {
  data: string;
  suffix?: string;
  subText?: string;
  preText?: string;
  title: string;
  background?: string;
  countDown?: boolean;
  emoji?: string;
  icon: string;
  slideIndex?: number;
}

export default function Slide({
  data,
  suffix,
  subText,
  preText,
  title,
  background = `
    linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
    linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
  `,
  countDown,
  emoji,
  icon,
  slideIndex = 0,
}: SlideProps) {
  const slideColor = getSlideColor(slideIndex);
  const textGradient = getTextGradient(
    slideColor,
    getSlideColor(slideIndex + 1)
  );
  const [showPretext, setShowPretext] = useState(true);
  const [count, setCount] = useState(0); // Start count from 0

  useEffect(() => {
    setShowPretext(true);
    const timer = setTimeout(() => {
      setShowPretext(false);
    }, PRETEXT_DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let startTime: number;
    const duration = COUNTDOWN_ANIMATION_DURATION;
    const target = Number(data);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const newCount = Math.min(
        Math.round((progress / duration) * target),
        target
      );
      setCount(newCount);

      if (progress < duration && countDown) {
        requestAnimationFrame(animate);
      }
    };

    if (countDown) {
      requestAnimationFrame(animate);
    }
  }, [data, showPretext, countDown]);

  return (
    <div
      style={{
        height: "100svh",
        position: "relative",
        background: background,
        backgroundSize: "20px 20px",
        overflow: "hidden",
      }}
    >
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
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: "2rem",
          }}
        >
          <motion.div
            style={{ position: "absolute", top: "3rem" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FloatedGlass blur={"10px"}>
              <div
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  padding: "1rem 1.5rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{icon}</span>
                <span>{title}</span>
              </div>
            </FloatedGlass>
          </motion.div>

          {showPretext ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: "1.5rem",
                padding: "2rem",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.6,
                maxWidth: "90%",
              }}
            >
              {preText}
            </motion.div>
          ) : (
            <motion.div
              className="metric"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {emoji && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  style={{ fontSize: "5rem" }}
                >
                  {emoji}
                </motion.div>
              )}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 800,
                  margin: "0.5rem",
                  padding: "0 2rem",
                  lineHeight: 1.1,
                  textAlign: "center",
                }}
              >
                <span
                  className="metric-number"
                  style={{
                    background: textGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                  }}
                >
                  {countDown ? count.toLocaleString() : data} {suffix}
                </span>
              </motion.h1>
              {subText && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                    padding: "0 2rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    textAlign: "center",
                    lineHeight: 1.5,
                    maxWidth: "90%",
                  }}
                >
                  {subText}
                </motion.p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
