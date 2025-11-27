"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PRETEXT_DISPLAY_DURATION,
  COUNTDOWN_ANIMATION_DURATION,
  GRID_PATTERN,
} from "@/constants/ui";
import { primaryColor, primaryGradient } from "@/constants/colors";
import Card from "./Card";
import GridBackground from "./GridBackground";
import { IconType } from "react-icons/lib";
import React from "react";

export interface SlideProps {
  data: string;
  suffix?: string;
  subText?: string;
  preText?: string;
  title: string;
  background?: string;
  countDown?: boolean;
  emoji?: string;
  icon: IconType;
  gradient?: string;
  color?: string;
  slideIndex?: number;
}

export default function Slide({
  data,
  suffix,
  subText,
  preText,
  title,
  background = GRID_PATTERN,
  countDown,
  emoji,
  icon,
  gradient,
  color,
}: SlideProps) {
  const [showPretext, setShowPretext] = useState(true);
  const [count, setCount] = useState(0); // Start count from 0

  useEffect(() => {
    setShowPretext(true);
    setCount(0); // Reset count when slide changes
    const timer = setTimeout(() => {
      setShowPretext(false);
    }, PRETEXT_DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    if (!countDown) {
      setCount(Number(data));
      return;
    }

    // Only start countdown animation after pretext is hidden
    if (showPretext) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrameId: number;
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

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [data, countDown, showPretext]);

  return (
    <GridBackground background={background}>
      {/* Foreground Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
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
            <Card>
              <div
                style={{
                  color: "white",
                  fontSize: "1rem",

                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    background: (color || primaryColor) + "44",
                    padding: "0.5rem",
                    borderRadius: "50%",
                    aspectRatio: 1,
                    width: "1rem",
                    height: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon &&
                    React.createElement(icon, { color: color || primaryColor })}
                </div>

                <span>{title.toUpperCase()}</span>
              </div>
            </Card>
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
                fontFamily: "'JetBrains Mono', monospace",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.02em",
              }}
            >
              {emoji && (
                <motion.div
                  key={title}
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    rotate: [-180, 0, 0],
                    opacity: 1,
                  }}
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
                <motion.span
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: gradient || primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                    textShadow: `0 0 5px ${color || primaryColor}`,
                    filter: `drop-shadow(0 0 5px ${color || primaryColor})`,
                  }}
                >
                  {countDown ? count.toLocaleString() : data} {suffix}
                </motion.span>
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
    </GridBackground>
  );
}
