import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SliderProps } from "../types.ts";
import Countdown from "./Countdown.tsx";

const Slider: React.FC<SliderProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const SLIDE_DURATION = 5000; // Slide duration in ms

    useEffect(() => {
        startProgress();
        return () => clearTimer(); // Cleanup timer on unmount or index change
    }, [currentIndex]);

    const startProgress = () => {
        clearTimer();
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    goToNextSlide();
                }
                return next;
            });
        }, SLIDE_DURATION / 100);

        timerRef.current = interval;
    };

    const clearTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const goToNextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX } = e;
        const { innerWidth } = window;

        if (clientX < innerWidth / 2) goToPrevSlide();
        else goToNextSlide();
    };

    return (
        <div
            className="slider-container"
            onClick={handleTap}
            style={{
                display: "flex",
                position: "relative",
                width: "500px",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Progress Bars */}
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "0",
                    right: "0",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    zIndex: 10,
                }}
            >
                {slides.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            height: "4px",
                            background: "rgba(255, 255, 255, 0.3)",
                            margin: "0 2px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width:
                                    index === currentIndex
                                        ? `${progress}%`
                                        : index < currentIndex
                                            ? "100%"
                                            : "0%",
                                height: "100%",
                                background: "#fff",
                                transition: index === currentIndex ? "none" : "width 0.3s ease",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Slides */}
            <div
                style={{
                    display: "flex",
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: "transform 0.5s ease",
                    width: `${slides.length * 100}%`,
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        style={{
                            flex: "1 0 100%",
                            height: "100vh",
                            position: "relative",
                            background: slide.background,
                        }}
                    >
                        {/* Floating Icons */}
                        {slide.icons.map((icon, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ y: icon.initialY, x: icon.initialX }}
                                animate={{ y: [icon.initialY - 100, icon.initialY + 100, icon.initialY - 100] }}
                                transition={{
                                    duration: icon.duration,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                }}
                                style={{
                                    position: "absolute",
                                    top: `${icon.initialY}%`,
                                    left: `${icon.initialX}%`,
                                    fontSize: `${icon.size}rem`,
                                    opacity: icon.opacity,
                                    filter: `blur(${icon.blur}px)`,
                                    color: icon.color || "#fff",
                                    zIndex: icon.zIndex || 20,
                                }}
                            >
                                {icon.content}
                            </motion.div>
                        ))}

                        {/* Foreground Text */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                color: "#08C2F1",
                                zIndex: 1,
                            }}
                        >
                            <motion.h1
                                key={`text-${currentIndex}`} // Forces reanimation
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
                                style={{ fontSize: "3rem", fontWeight: "bold",}}
                            >
                                <Countdown target={parseInt(slide.text, 10)} duration={1} />
                            </motion.h1>
                            <motion.p
                                key={`subtext-${currentIndex}`} // Forces reanimation
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                style={{ fontSize: "1.5rem" }}
                            >
                                {slide.subtext}
                            </motion.p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;