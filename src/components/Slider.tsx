import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconButton from "./IconButton.tsx";
import { IoMdRefresh, IoMdClose } from "react-icons/io";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import {
  SLIDE_DURATION,
  MOBILE_BREAKPOINT,
  PROGRESS_BAR_HEIGHT,
  PROGRESS_UPDATE_INTERVAL,
  PRIMARY_COLOR,
} from "../constants/ui.ts";
import githubLogo from "../assets/github-logo.png";

interface SliderProps {
  slides: React.ComponentType[];
  slideDuration?: number;
  progressBarHeight?: number;
  isPlaying?: boolean;
  onToggleAudio?: () => void;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export default function Slider({
  slides,
  slideDuration = SLIDE_DURATION,
  progressBarHeight = PROGRESS_BAR_HEIGHT,
  isPlaying = false,
  onToggleAudio,
  onDownload,
  isDownloading = false,
}: SliderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [progressValues, setProgressValues] = useState<number[]>(
    Array(slides.length).fill(0)
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Move to the next slide
  const goToNextSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentSlide((prev) => {
      if (prev < slides.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentSlide((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return slides.length - 1;
    });
  }, [slides.length]);

  // Reset progress for the next slide
  const resetProgressForNextSlide = useCallback(() => {
    setProgressValues((prev) => {
      const updatedProgress = [...prev];
      updatedProgress[currentSlide] = 0;
      if (currentSlide < slides.length - 1) {
        updatedProgress[currentSlide + 1] = 0;
      }
      return updatedProgress;
    });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [currentSlide, slides.length]);

  // Function to update progress for the current slide
  const updateProgress = useCallback(() => {
    setProgressValues((prev) => {
      const updatedProgress = [...prev];
      const increment = 100 / (slideDuration / PROGRESS_UPDATE_INTERVAL);
      if (updatedProgress[currentSlide] + increment >= 100) {
        updatedProgress[currentSlide] = 100;
        goToNextSlide();
      } else {
        updatedProgress[currentSlide] += increment;
      }
      return updatedProgress;
    });
  }, [currentSlide, slideDuration, goToNextSlide]);

  // Handle taps for navigation
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const screenWidth = window.innerWidth;
    if (e.clientX > screenWidth / 2) {
      goToNextSlide();
    } else {
      goToPrevSlide();
    }
  };

  const goHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.location.href = "/";
  };

  const goNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goToNextSlide();
  };

  const goPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goToPrevSlide();
  };

  const goToFirstSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentSlide(0);
    resetProgressForNextSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setCurrentSlide(0);
        resetProgressForNextSlide();
      } else if (e.key === "Escape") {
        e.preventDefault();
        window.location.href = "/";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, resetProgressForNextSlide]);

  // Start the timer for the current slide
  useEffect(() => {
    resetProgressForNextSlide();
    intervalRef.current = setInterval(updateProgress, PROGRESS_UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentSlide, updateProgress, resetProgressForNextSlide]);

  return (
    <div
      onClick={handleTap}
      role="region"
      aria-label="GitHub wrap slideshow"
      tabIndex={0}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#000",
        height: "100svh",
        overflow: "hidden",
      }}
    >
      {/* Colorful Segmented Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          right: "1rem",
          width: "calc(100% - 2rem)",
          display: "flex",
          justifyContent: "space-between",
          gap: "4px",
          zIndex: 55,
        }}
      >
        {slides.map((_, index) => {
          const isActive = index === currentSlide;
          const isCompleted = index < currentSlide;

          return (
            <div
              key={index}
              style={{
                flexGrow: "1",
                height: `${progressBarHeight}px`,
                backgroundColor: isCompleted
                  ? "rgba(8, 194, 241, 0.2)"
                  : "rgba(8, 194, 241, 0.1)",
                opacity: isActive ? "1" : isCompleted ? "0.6" : "0.3",
                overflow: "hidden",
                borderRadius: "10px",
                position: "relative",
                transition: "opacity 0.3s ease, background-color 0.3s ease",
              }}
            >
              <motion.div
                style={{
                  width: `${progressValues[index]}%`,
                  height: "100%",
                  backgroundColor: PRIMARY_COLOR,
                  borderRadius: "10px",
                }}
                initial={false}
                animate={{
                  width: `${progressValues[index]}%`,
                }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Slide Counter - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "3rem",
            right: "1rem",
            zIndex: 55,
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.875rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {currentSlide + 1} / {slides.length}
        </motion.div>
      )}

      {/* Slides Rendering with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {slides.map((SlideComponent, index) => {
          if (currentSlide !== index) return null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <SlideComponent />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Bottom Bar - Hashtag on left, buttons on right */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          right: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        {/* GitHub Hashtag - Left side */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            pointerEvents: "auto",
          }}
        >
          <img
            style={{ width: "1.2rem", height: "1.2rem" }}
            src={githubLogo}
            alt="GitHub Logo"
          />
          <p
            style={{
              opacity: 0.6,
              fontSize: "0.875rem",
              fontFamily: "system-ui, sans-serif",
              color: "rgba(255, 255, 255, 0.7)",
              margin: 0,
            }}
          >
            #GitHubOnWrap
          </p>
        </div>

        {/* Unified Control Buttons - Right side */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            flexDirection: "row",
            pointerEvents: "auto",
          }}
        >
          {/* Download Button */}
          {onDownload && (
            <IconButton
              icon={<LuDownload />}
              text={isDownloading ? "generating..." : undefined}
              handleClick={onDownload}
              aria-label={
                isDownloading ? "Generating image" : "Download wrap as image"
              }
            />
          )}

          {/* Restart Button */}
          <IconButton
            icon={<IoMdRefresh />}
            handleClick={goToFirstSlide}
            aria-label="Restart slideshow"
          />
          {/* Exit Button */}
          <IconButton
            icon={<IoMdClose />}
            handleClick={goHome}
            aria-label="Return to home"
          />
          {/* Sound Button */}
          {onToggleAudio && (
            <IconButton
              icon={!isPlaying ? <MdMusicNote /> : <MdMusicOff />}
              handleClick={onToggleAudio}
              aria-label={
                isPlaying ? "Pause background music" : "Play background music"
              }
            />
          )}
        </div>
      </div>

      {/* Arrow Navigation Buttons */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            inset: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <div style={{ pointerEvents: "auto" }}>
            <IconButton
              icon={<TiArrowLeftOutline />}
              handleClick={goPrev}
              aria-label="Previous slide"
            />
          </div>
          <div style={{ pointerEvents: "auto" }}>
            <IconButton
              icon={<TiArrowRightOutline />}
              handleClick={goNext}
              aria-label="Next slide"
            />
          </div>
        </div>
      )}
    </div>
  );
}
